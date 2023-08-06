### Prepare DB and Redis Docker

```sh
docker-compose -f server/docker-compose.yaml up -d // start `redis` and `mongod`
mongorestore --host localhost --port 27017 --db db db-dump // restore `database` on `db/db-dump` path [databasename is db]
```

## DB MONGODB (Default Port 27017)

1. Import Json File (db/db.reactApps.json)
2. use command

```sh
mongorestore --host localhost --port 27017 --db db db-dump/
```

## IN MEMORY REDIS (Default Port 6379)

### Ubuntu 
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04

### Window recommend docker Path `server` docker-compose.yml
https://docs.docker.com/desktop/install/windows-install/

### Mac use docker or install by homebrew
```sh
brew install redis
```

## Backend Node Express (Default Port 3333)

```sh
npm i
npm run dev
```

## Frontend React JS (Default Port 3000)
```sh
npm i
npm run start // or yarn start
```






