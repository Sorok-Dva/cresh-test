const Sequelize = require('../config/sequelize');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome on Cresh API.')
});

router.get('/ping',
  async (req, res, next) => {
    let dbQuery = await Sequelize.authenticate()
      .then(() => 'Database is UP')
      .catch(() => 'Database is DOWN');

    res.send(`Service is UP\n${dbQuery}`);
  }
);

module.exports = router;
