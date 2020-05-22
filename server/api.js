const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const logger = require('./logger');
const { TOKEN } = require('./constants');

const app = express();
app.use(bodyParser.json());

app.post(
  '/send',
  ({ body: { address } = {} }, res) => {
    logger.info(`Target wallet address: ${address}`)

    fetch(
      'https://api-staging.blocto.app/reward/send',
      {
        method: 'POST',
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blockchain: "ethereum",
          wallet_address: address,
          point: 10
        })
      })
      .then(response => response.json())
      .then((json) => {
        logger.json(json)

        return res.json(json);
      })
      .catch((error) => {
        logger.error(error);

        res.status(500).send('unknown error');
      });
  }
);

module.exports = app;
