# Deploying to the Raspberry Pi (onurkagancoskun.com/openhouse)

## Build & push (on the PC)
```powershell
docker buildx build `
  --platform linux/amd64,linux/arm64 `
  --build-arg NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddeexuf4h `
  -t metu1onurc1/openhouse:latest `
  --push .
```
`BASE_PATH` defaults to `/openhouse` (build arg); it is baked into the bundle.

## Run (on the Pi, first time)
```bash
mkdir -p ~/openhouse && cd ~/openhouse
# copy docker-compose.yml and .env.example here, then:
cp .env.example .env && nano .env      # fill in secrets
docker compose up -d
```
App listens on host port 3001. MongoDB runs as the `mongo` service in the same compose
project (data in the `mongo-data` volume, not exposed outside Docker).

Needs a **64-bit** Raspberry Pi OS (`uname -m` -> `aarch64`). Check the model with
`cat /proc/device-tree/model`:
- **Pi 5**: nothing to do, uses `mongo:7`.
- **Pi 4**: add `MONGO_IMAGE=mongo:4.4.18` to `.env`. MongoDB 5+ needs ARMv8.2, and on a
  Pi 4 it crashes with "Illegal instruction".

## Migrate data from Atlas (one time)
1. Dump Atlas on the PC (the mongo:7 image includes the database tools):
   ```powershell
   docker run --rm -v ${PWD}:/out mongo:7 mongodump `
     --uri "mongodb+srv://USER:PASSWORD@cluster0.btvfjrj.mongodb.net/test" `
     --archive=/out/atlas.archive --gzip
   scp atlas.archive pi@<pi-host>:~/openhouse/
   ```
2. On the Pi, start only the database and wait for it to be healthy:
   ```bash
   cd ~/openhouse && docker compose up -d --wait mongo
   ```
3. Restore it, renaming the Atlas `test` database to `openhouse`:
   ```bash
   docker exec -i openhouse-mongo mongorestore --archive --gzip \
     --nsFrom='test.*' --nsTo='openhouse.*' < atlas.archive
   ```
4. Check the counts, then start the app:
   ```bash
   docker exec openhouse-mongo sh -c 'command -v mongosh >/dev/null && S=mongosh || S=mongo; $S openhouse --quiet --eval "db.getCollectionNames().forEach(c => print(c, db[c].countDocuments({})))"'
   docker compose up -d
   ```
Keep the Atlas cluster until the app has worked on the Pi for a while.

## Backup
```bash
docker exec openhouse-mongo mongodump --db openhouse --archive --gzip > ~/openhouse-$(date +%F).archive
```

## Update
```bash
cd ~/openhouse && docker compose pull && docker compose up -d
```

## Cloudflare Tunnel
Public hostname `onurkagancoskun.com`, path `^/openhouse` -> `http://localhost:3001`.
It must be listed ABOVE the catch-all rule that sends the domain to the portfolio.

## Google login
Authorized redirect URI: `https://onurkagancoskun.com/openhouse/api/auth/callback/google`
