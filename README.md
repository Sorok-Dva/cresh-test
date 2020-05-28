# Cresh Test Project

## Run application

Install project dependencies:

```bash
npm install
```

Create .env file:

```bash
mv .env-sample .env
```

Create local database & migration :

```bash
mysql> CREATE DATABASE cresh_llyam_dev;
```

```bash
npm run db:migrate;
```

Run local server:

```bash
npm start       
```

Run test :
```bash
curl http://localhost:3001/ping/
```
It should response 
```
Service is UP
Database is UP
```