'use strict';

module.exports = (sequelize, DataTypes) => {
  let staff = sequelize.define('Staff', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'staff_id' },
    first_name: {type: DataTypes.STRING(45), allowNull: false, field: 'first_name'},
    last_name: {type: DataTypes.STRING(45), allowNull: false, field: 'last_name'},
    email: {type: DataTypes.STRING(50), allowNull: false },
    username: {type: DataTypes.STRING(16), allowNull: false },
    password: DataTypes.STRING(40),
    picture: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'staff',
    timestamps: false,
    classMethods: {
      associate: models => {
        staff.belongsTo(models.Address, { foreignKey: 'address_id' });
        staff.belongsTo(models.Store, { foreignKey: { name: 'store_id', allowNull: false } })
      }
    }
  });

  return staff;
};