const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const logger = require('./logger');

const app = express();
app.use(bodyParser.json());

const token = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdG9rZW5faWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJkYXBwX2lkIjoiMTk2NmZiNGQtNTQ0OS00MmM4LTliOGMtMjhkYmVlMjU5NmRmIiwiZGV2aWNlX2lkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiaW5mbyI6IiIsInNjb3BlcyI6WyIvcmV3YXJkL3NlbmQiXSwic2tpcF9hY2Nlc3NfdG9rZW4iOnRydWUsInVzZXJfaWQiOiIwMTY4YTU2Yi05MGQ5LTQ4MTUtYWI2Yy1lMzJhNDdmMDE1MWEifQ.8dAnuqzFKGl8SJ9YVbyFIlWE-0U0kCosmdnblQYNgm_1_U_oagI9PqNwpSEJxeXN';

app.post(
  '/send',
  ({ body: { address } = {} }, res) => {
    logger.info(`Target wallet address: ${address}`)

    fetch(
      'https://api-staging.blocto.app/reward/send',
      {
        method: 'POST',
        headers: {
          'Authorization': token,
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
