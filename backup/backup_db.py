import os
import subprocess
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from dotenv import load_dotenv
import logging
import sys
import re
import time

LOG_FILES = [
    os.path.expanduser("~/teman-sejati-v2-backup/logs/backupdb.log")
]
TIMESTAMP_PATTERN = re.compile(r"^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})")

load_dotenv()

class StdoutHandler(logging.StreamHandler):
    def emit(self, record):
        if record.levelno == logging.INFO:
            super().emit(record)

class StderrHandler(logging.StreamHandler):
    def emit(self, record):
        if record.levelno == logging.ERROR:
            super().emit(record)

logger = logging.getLogger()
logger.setLevel(logging.INFO)

stdout_handler = StdoutHandler(sys.stdout)
stderr_handler = StderrHandler(sys.stderr)

formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
stdout_handler.setFormatter(formatter)
stderr_handler.setFormatter(formatter)

logger.addHandler(stdout_handler)
logger.addHandler(stderr_handler)

PG_URL = os.getenv('PG_URL')
RETENTION_DAYS = int(os.getenv('RETENTION_DAYS', 3))
MAX_DB_SIZE = int(os.getenv('MAX_DB_SIZE', 1073741824))  # Default to 1 GB if not set
MAX_RETRIES = int(os.getenv('MAX_RETRIES', 3))
RETRY_DELAY_SEC = int(os.getenv('RETRY_DELAY_SEC', 5))  # Default to 5 sec if not set

BACKUP_DIR = os.getenv('BACKUP_DIR')
BACKUP_DIR = os.path.expanduser(BACKUP_DIR)

SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
TO_EMAIL = os.getenv('TO_EMAIL')

now = datetime.now()
today = now.strftime('%Y-%m-%d')
cutoff_date = now - timedelta(days=RETENTION_DAYS)


def get_db_size():
    conn = subprocess.Popen(['psql', PG_URL, '-c', "SELECT pg_database_size(current_database());"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = conn.communicate()
    if stderr:
        logger.error(f"Error: {stderr.decode()}")
        return None
    return int(stdout.decode().split("\n")[2].strip())


def send_email(subject, body):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_USER
    msg['To'] = TO_EMAIL
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_USER, TO_EMAIL, msg.as_string())
            logger.info(f"Email to {TO_EMAIL} sent successfully.")
    except Exception as e:
        logger.error(f"Error sending email: {e}")


def create_backup():
    current_time = now.strftime('%Y%m%d_%H%M%S')
    backup_filename = f"backup_{current_time}.sql"
    backup_filepath = os.path.join(BACKUP_DIR, backup_filename)

    try:
        command = ['pg_dump', PG_URL, '-f', backup_filepath]
        subprocess.check_call(command)
        logger.info(f"Backup created successfully: {backup_filepath}")
        return backup_filepath, True
    except subprocess.CalledProcessError as e:
        logger.error(f"Error creating backup: {e}")
        return None, False


def delete_old_backups():
    for filename in os.listdir(BACKUP_DIR):
        file_path = os.path.join(BACKUP_DIR, filename)

        if filename.startswith('backup_') and filename.endswith('.sql'):
            file_creation_time = datetime.strptime(filename.split('_')[1], '%Y%m%d')
            file_age = now - file_creation_time

            if file_age > timedelta(days=RETENTION_DAYS):
                logger.info(f"Deleting old backup: {file_path}")
                os.remove(file_path)


def backup_exists_for_today():
    today = now.strftime('%Y%m%d')
    for filename in os.listdir(BACKUP_DIR):
        if filename.startswith(f"backup_{today}") and filename.endswith('.sql'):
            logger.info(f"Backup for today ({today}) already exists. Skipping backup.")
            return True
    return False


def clean_old_logs(log_file):
    if not os.path.exists(log_file):
        logger.error(f"{log_file} not found.")
        return
    
    cleaned_lines = []
    
    with open(log_file, "r") as log:
        for line in log:
            match = TIMESTAMP_PATTERN.match(line)
            if match:
                log_date = datetime.strptime(match.group(1), "%Y-%m-%d %H:%M:%S")
                if log_date >= cutoff_date:
                    cleaned_lines.append(line)
            else:
                cleaned_lines.append(line)
    
    with open(log_file, "r+") as log:
        log.truncate(0)
        log.writelines(cleaned_lines)
        log.flush()
    
    logger.info(f"Old log entries removed from {log_file} successfully.")


def send_success_email(backup_filepath):
    subject = f"{today} - PostgreSQL Backup Success"
    body = f"The backup of the database was successful.\nBackup file: {backup_filepath}"
    send_email(subject, body)


def send_failed_email():
    subject = f"{today} - PostgreSQL Backup Failure"
    body = f"The backup of the database failed. No backup was created.\nFind the logs inside: ~/teman-sejati-v2-backup/logs/backupdb.log."
    send_email(subject, body)


def main():
    logger.info(f"Starting to run a backup job...")
    
    if backup_exists_for_today():
        return

    attempts = 0
    db_size_success = False
    while True:
        attempts += 1
        logger.info(f"Get DB size attempt {attempts}/{MAX_RETRIES}...")
        db_size = get_db_size()
        db_size_success = db_size is not None
        if db_size_success:
            break
        elif attempts >= MAX_RETRIES:
            send_failed_email()
            logger.error("Could not retrieve database size. Exiting.")
            return
        time.sleep(RETRY_DELAY_SEC)

    if db_size > MAX_DB_SIZE:
        subject = f"{today} - PostgreSQL Backup Alert: Database Size Exceeded"
        body = f"Database size ({db_size / 1024 / 1024 / 1024:.2f} GB) exceeds the 1 GB limit. Backup aborted."
        send_email(subject, body)
        logger.error(f"Database size ({db_size / 1024 / 1024 / 1024:.2f} GB) exceeds the limit. Aborting backup.")
        return

    logger.info(f"DB size {db_size / 1024 / 1024:.2f} MB. Starting to create a backup...")

    attempts = 0
    backup_success = False
    while True:
        attempts += 1
        logger.info(f"Backup attempt {attempts}/{MAX_RETRIES}...")
        backup_filepath, backup_success = create_backup()
        if backup_success:
            send_success_email(backup_filepath)
            break
        elif attempts >= MAX_RETRIES:
            send_failed_email()
            break
        time.sleep(RETRY_DELAY_SEC)

    if backup_success:
        delete_old_backups()
        for log_file in LOG_FILES:
            clean_old_logs(log_file)

if __name__ == "__main__":
    main()
