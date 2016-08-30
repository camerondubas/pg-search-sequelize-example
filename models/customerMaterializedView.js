'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('CustomerMaterializedView', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'customer_id'},
  firstName: DataTypes.STRING,
  lastName: DataTypes.TEXT,
  email: DataTypes.INTEGER,
  activeBoolean: DataTypes.STRING,
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