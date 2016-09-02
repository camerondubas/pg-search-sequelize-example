'use strict';
let express = require('express');
let app = express();
let models = require('./models');

app.get('/film/:query', (req, res) => models.FilmMaterializedView.searchByText(req.params.query).then(data => res.send(data)));
app.get('/customer/:query', (req, res) => models.CustomerMaterializedView.searchByText(req.params.query).then(data => res.send(data)));

app.listen(3000, () => console.log('app server started on port 3000'));
