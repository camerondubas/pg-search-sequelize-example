'use strict';

module.exports = (sequelize, DataTypes) => {
  let city = sequelize.define('City', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'city_id' },
    name: { type: DataTypes.STRING, allowNull: false, field: 'city' },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'city',
    timestamps: false,
    classMethods: {
      associate: models => {
        city.belongsTo(models.Country, { foreignKey: 'country_id' });
        city.hasMany(models.Address, { foreignKey: 'city_id' });
      }
    }
  });

  return city;
};