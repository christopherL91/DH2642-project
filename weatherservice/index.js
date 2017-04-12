#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const DarkSky = require('dark-sky');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const forecast = new DarkSky('a7e61e83d8583bfa9373f9617ded708c');

app.post('/forecast', (req, res, next) => {
  const {latitude, longitude} = req.body;
  if(!latitude || !longitude) {
    return next(new Error('latitude or longitude missing!'));
  }

  return forecast.
    latitude(latitude)
    .longitude(longitude)
    .units('ca')
    .language('en')
    .exclude('daily')
    .extendHourly(true)
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json(err);
});

app.listen(8080, () => {
  console.log('Weather service started on localhost:8080');
});
