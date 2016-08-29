'use strict';

module.exports = (sequelize, DataTypes) => {
  let address = sequelize.define('Address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'address_id' },
    address: { type: DataTypes.STRING(50), allowNull: false },
    address2: DataTypes.STRING(50),
    district: { type: DataTypes.STRING(20), allowNull: false },
    postalCode: { type: DataTypes.STRING(10), field: 'postal_code' },
    phone: { type: DataTypes.STRING(10), allowNull: false },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'address',
    timestamps: false,
    classMethods: {
      associate: models => {
        address.belongsTo(models.City, { foreignKey: { name: 'city_id', allowNull: false } });
        address.hasMany(models.Staff, { foreignKey: { name: 'staff_id', allowNull: false } });
        address.hasMany(models.Store, { foreignKey: { name: 'address_id', allowNull: false } });
        address.hasMany(models.Customer, { foreignKey: { name: 'address_id', allowNull: false } });
      }
    }
  });

  return address;
};