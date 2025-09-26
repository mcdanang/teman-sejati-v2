#!/bin/bash

HOME_PATH="$HOME/"
sed -i "" "s|~/|$HOME_PATH|g" com.teman-sejati-v2.backupdb.plist

PSQL_PATH=$(which psql)
if [ -z "$PSQL_PATH" ]; then
    echo "Error: psql not found in PATH."
    exit 1
fi
sed -i "" "s|psql|$PSQL_PATH|g" backup_db.py

PG_DUMP_PATH=$(which pg_dump)
if [ -z "$PG_DUMP_PATH" ]; then
    echo "Error: pg_dump not found in PATH."
    exit 1
fi
sed -i "" "s|pg_dump|$PG_DUMP_PATH|g" backup_db.py

python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

mkdir -p ~/teman-sejati-v2-backup
mkdir -p ~/teman-sejati-v2-backup/codes
mkdir -p ~/teman-sejati-v2-backup/results
mkdir -p ~/teman-sejati-v2-backup/logs

rm -rf ~/teman-sejati-v2-backup/codes/* ~/teman-sejati-v2-backup/codes/.[!.]*
cp -a . ~/teman-sejati-v2-backup/codes/

if launchctl list | grep -q com.teman-sejati-v2.backupdb; then
    launchctl unload -w ~/Library/LaunchAgents/com.teman-sejati-v2.backupdb.plist
fi
rm -f ~/Library/LaunchAgents/com.teman-sejati-v2.backupdb.plist
cp ~/teman-sejati-v2-backup/codes/com.teman-sejati-v2.backupdb.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/com.teman-sejati-v2.backupdb.plist
launchctl list | grep teman-sejati-v2

sed -i "" "s|$PG_DUMP_PATH|pg_dump|g" backup_db.py
sed -i "" "s|$PSQL_PATH|psql|g" backup_db.py
sed -i "" "s|$HOME_PATH|~/|g" com.teman-sejati-v2.backupdb.plist
