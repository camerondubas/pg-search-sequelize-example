'use strict';
let express = require('express');
let app = express();
let models = require('./models');
const PORT = process.env.PORT || 3000;

app.get('/film/:query', (req, res) => models.FilmMaterializedView.searchByText(req.params.query).then(data => res.send(data)));
app.get('/customer/:query', (req, res) => models.CustomerMaterializedView.searchByText(req.params.query).then(data => res.send(data)));

app.listen(PORT, () => console.log('app server started on port ' + PORT));
