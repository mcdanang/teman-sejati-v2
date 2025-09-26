# Backup Scripts

## PostgreSQL DB

### Installation on MacOS

1. Ensure PostgreSQL 16.x has been installed in your local machine which provides `pg_dump` utility. You can verify the installation by checking the version of `pg_dump`:

```
pg_dump --version
```

it should show version 16.x.

2. Ensure Python3 has been installed in your local machine:

```
python3 --version
```

3. Ensure Pip3 has been installed in your local machine:

```
pip3 --version
```

4. Ensure XCrun has been installed in your local machine:

```
xcrun --version
```

if not, install it by installing Xcode:

```
xcode-select --install
```

5. Create `.env` file following the `.env.example` format.

6. Run the setup script:

```
./setup_mac.sh
```

7. Verify the job is loaded and running:

```
launchctl list | grep teman-sejati-v2
```

8. You can find the backup files inside `~/teman-sejati-v2-backup/results/` directory:

```
cd ~/teman-sejati-v2-backup/results/
ls
```

### FAQs

1. Where to find the scheduled job logs?

You can find the logs here:

```
tail -f ~/teman-sejati-v2-backup/logs/backupdb.log
```

2. How to restore the backup DB?

You can run the following command:

```
psql <pg_url> -f <backup_filepath>
```
