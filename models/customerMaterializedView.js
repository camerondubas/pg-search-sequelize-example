'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('CustomerMaterializedView', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'customer_id'},
  firstName: { type: DataTypes.STRING, field: 'first_name'},
  lastName: { type: DataTypes.TEXT, field: 'last_name'},
  email: DataTypes.INTEGER,
  active: DataTypes.STRING,
  document: DataTypes.TEXT
}, {
  tableName: 'customer_materialized_view',
  referenceModel: 'Customer',
  timestamps: false,
  search: true,
  defaultScope: {
    attributes: {
      exclude: ['id']
    }
  }
});