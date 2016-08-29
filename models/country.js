'use strict';

module.exports = (sequelize, DataTypes) => {
  let country = sequelize.define('Country', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'country_id' },
    name: { type: DataTypes.STRING, allowNull: false, field: 'country' },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'country',
    timestamps: false,
    classMethods: {
      associate: models => {
        country.hasMany(models.City, { foreignKey: { name: 'country_id', allowNull: false } });
      }
    }
  });

  return country;
};