'use strict';

module.exports = (sequelize, DataTypes) => {
  let store = sequelize.define('Store', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'store_id' },
    name: {type: DataTypes.STRING(45), allowNull: false },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'store',
    timestamps: false,
    classMethods: {
      associate: models => {
        store.belongsToMany(models.Film, {
          through: models.Inventory,
          as: 'Films',
          foreignKey: {
            name: 'store_id',
            allowNull: false
          },
          otherKey: 'film_id'
        });
        store.belongsTo(models.Staff, { as: 'ManagerStaff', foreignKey: { name: 'manager_staff_id', allowNull: false } });
        store.belongsTo(models.Address, { foreignKey: { name: 'address_id', allowNull: false } });
        store.hasMany(models.Inventory, { foreignKey: { name: 'store_id', allowNull: false } });
        store.hasMany(models.Customer, { foreignKey: { name: 'customer_id', allowNull: false } });
        store.hasMany(models.Staff, { foreignKey: { name: 'staff_id', allowNull: false } });
      }
    }
  });

  return store;
};