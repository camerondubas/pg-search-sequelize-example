let fs = require('fs');
let config = require('../config/sequelize');
let SearchModel = require('../lib/searchModel');
let Sequelize = require('sequelize');
let sequelize = new Sequelize(config.database, config.username, config.password, config);

let models = {};

// ======================
// Models
// ======================
fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    let model = sequelize.import('./' + file);
    models[model.name] = model;
  });

Object.keys(models).forEach(key => {
  let model = models[key];
  if ('associate' in model) model.associate(models);

  if ('referenceModel' in model.options) model.referenceModel = models[model.options.referenceModel];

  if ('search' in model.options) new SearchModel(model);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;