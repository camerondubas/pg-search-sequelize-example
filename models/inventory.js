'use strict';

module.exports = (sequelize, DataTypes) => {
  let inventory = sequelize.define('Inventory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'inventory_id' },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'inventory',
    timestamps: false,
    classMethods: {
      associate: models => {
        inventory.belongsTo(models.Film, { foreignKey: 'film_id' });
        inventory.belongsTo(models.Store, { foreignKey: 'store_id' });
      }
    }
  });

  return inventory;
};