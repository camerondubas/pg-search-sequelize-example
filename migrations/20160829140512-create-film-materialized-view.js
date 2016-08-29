'use strict';
let QueryGenerator = require('../lib/queryGenerator');
let models = require('../models');
module.exports = {
  up: queryInterface => QueryGenerator.createMaterializedView(queryInterface, 'film_materialized_view', models.Film, {
    attributes: {
      title: 'A',
      description: 'B',
      special_features: 'C',
      rental_duration: 'C',
      rental_rate: 'C',
      release_year: 'C',
      replacement_cost: 'C',
      length: 'C'
    },
    include: [
      {
        model: models.Language,
        foreignKey: 'language_id',
        targetKey: 'language_id',
        attributes: {
          name: 'C'
        }
      },
      {
        model: models.Language,
        as: 'original_language',
        targetKey: 'language_id',
        foreignKey: 'original_language_id',
        attributes: {
          name: 'C'
        }
      }
    ]
  }),

  down: queryInterface => QueryGenerator.dropMaterializedView(queryInterface, 'film_materialized_view')
};