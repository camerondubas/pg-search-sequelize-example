'use strict';
let QueryInterface = require('pg-search-sequelize').QueryInterface;
let models = require('../models');
module.exports = {
  up: queryInterface => new QueryInterface(queryInterface).createMaterializedView('film_materialized_view', models.Film, {
    title: 'A',
    description: 'B',
    special_features: 'C',
    rental_duration: 'C',
    rental_rate: 'C',
    release_year: 'C',
    replacement_cost: 'C',
    length: 'C'
  }, {
    include: [
      {
        model: models.Language,
        foreignKey: 'language_id',
        targetKey: 'language_id',
        associationType: 'belongsTo',
        attributes: {
          name: 'C'
        }
      },
      {
        model: models.Language,
        as: 'original_language',
        targetKey: 'language_id',
        foreignKey: 'original_language_id',
        associationType: 'belongsTo',
        attributes: {
          name: 'C'
        }
      }
    ]
  }),

  down: queryInterface => new QueryInterface(queryInterface).dropMaterializedView('film_materialized_view')
};