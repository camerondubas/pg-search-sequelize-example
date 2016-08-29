'use strict';

module.exports = (sequelize, DataTypes) => {
  let customer = sequelize.define('Customer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'customer_id' },
    first_name: {type: DataTypes.STRING(45), allowNull: false, field: 'first_name'},
    last_name: {type: DataTypes.STRING(45), allowNull: false, field: 'last_name'},
    email: {type: DataTypes.STRING(50), allowNull: false },
    active: DataTypes.INTEGER,
    activeBoolean: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'activebool' },
    createDate: { type: DataTypes.DATE, allowNull: false, field: 'create_date' },
    lastUpdate: { type: DataTypes.DATE, field: 'last_update' }
  }, {
    tableName: 'customer',
    timestamps: false,
    classMethods: {
      associate: models => {
        customer.belongsTo(models.Address, { foreignKey: { name: 'address_id', allowNull: false } });
        customer.belongsTo(models.Store, { foreignKey: { name: 'store_id', allowNull: false } });
      }
    }
  });

  return customer;
};