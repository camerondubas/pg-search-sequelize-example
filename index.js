'use strict';
let express = require('express');
let app = express();
let models = require('./models');
const PORT = process.env.PORT || 3000;
process.on('uncaughtException', console.error);

let allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.get('/film/:query', (req, res) => models.FilmMaterializedView.searchByText(req.params.query).then(data => res.send(data)));
app.get('/customer/:query', (req, res) => models.CustomerMaterializedView.searchByText(req.params.query).then(data => res.send(data)));

app.listen(PORT, () => console.log('app server started on port ' + PORT));
