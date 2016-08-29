'use strict';

module.exports = (sequelize, DataTypes) => {
  let store = sequelize.define('Store', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'store_id' },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'store',
    timestamps: false,
    classMethods: {
      associate: models => {
        store.belongsToMany(models.Film, {through: models.Inventory, as: 'Films', foreignKey: 'store_id', otherKey: 'film_id'});
        store.belongsTo(models.Staff, { as: 'ManagerStaff', foreignKey: { name: 'manager_staff_id', allowNull: false } });
        store.belongsTo(models.Address, { foreignKey: { name: 'address_id', allowNull: false } });
        store.hasMany(models.Inventory, { foreignKey: 'store_id' });
        store.hasMany(models.Customer, { foreignKey: 'customer_id' });
        store.hasMany(models.Staff, { foreignKey: 'staff_id' });
      }
    }
  });

  return store;
};