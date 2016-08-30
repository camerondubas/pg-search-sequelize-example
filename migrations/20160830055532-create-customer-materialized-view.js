'use strict';
let QueryGenerator = require('../lib/queryGenerator');
let models = require('../models');
module.exports = {
  up: queryInterface => QueryGenerator.createMaterializedView(queryInterface, 'customer_materialized_view', models.Customer, {
    first_name: 'A',
    last_name: 'A',
    email: 'A'
  }, {
    include: [
      {
        model: models.Store,
        foreignKey: 'store_id',
        targetKey: 'store_id',
        attributes: {
          name: 'B'
        },
        include: [
          {
            model: models.Staff,
            foreignKey: 'store_id',
            targetKey: 'store_id',
            associationType: 'hasOne',
            attributes: {
              first_name: 'D',
              last_name: 'D',
              email: 'D',
              username: 'D'
            }
          },
          {
            model: models.Staff,
            as: 'manager_staff',
            targetKey: 'staff_id',
            foreignKey: 'manager_staff_id',
            associationType: 'belongsTo',
            attributes: {
              first_name: 'C',
              last_name: 'C',
              email: 'C',
              username: 'C'
            }
          }
        ]
      }
    ]
  }),

  down: queryInterface => QueryGenerator.dropMaterializedView(queryInterface, 'customer_materialized_view')
};