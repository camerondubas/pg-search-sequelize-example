'use strict';
let express = require('express');
let app = express();
let debug = require('debug')('app');
let models = require('./models');

app.listen(3000, () => debug('app server started on port 3000'));
