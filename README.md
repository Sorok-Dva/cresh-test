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

Update Sequelize config file
```bash
vi sequelize/config/config.json
```

Create local database & migration :

```bash
mysql> CREATE DATABASE cresh_llyam_dev;
```

```bash
npm run db:migrate -- --env development;
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

## Run tests

Create test db & run migration
```bash
mysql> CREATE DATABASE cresh_llyam_test;
npm run db:migrate -- --env test;
```

```bash
ENV=test npm run test
```

### API Documentation

Route | Method | Query String | Body | Description
-|-|-|-|-
`/ping` | GET | - | - | See if the service is running properly, including the DB
`/customers` | GET | - | - | List of customers
`/customers` | POST | - | `name` | Create a customer
`/customers/:id/transactions` | GET | - | - | List of transactions for a specific customer
`/transactions` | POST | - | `store_name`<br />`amount`<br />`split`<br />`user_id` | Create a transaction
`/transactions/:id/instalments` | GET | - | - | List of a transaction's instalments
`/transactions/:id/instalments` | PUT | - | - | Trigger the payment of the transaction's next instalment
