let fs = require('fs');
let config = require('../config/sequelize');
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
  if ('associate' in model) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;