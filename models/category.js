'use strict';

module.exports = (sequelize, DataTypes) =>
  sequelize.define('Category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'category_id'},
    name: {type: DataTypes.STRING(25), allowNull: false},
    lastUpdate: {type: DataTypes.DATE, allowNull: false, field: 'last_update'}
  }, {
    tableName: 'category',
    timestamps: false,
  });
