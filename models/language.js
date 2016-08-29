'use strict';

module.exports = (sequelize, DataTypes) => {
  let language = sequelize.define('Language', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'language_id' },
    name: { type: DataTypes.CHAR(20), allowNull: false },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'language',
    timestamps: false,
    classMethods: {
      associate: models => {
        language.hasMany(models.Film, { as: 'Language', foreignKey: 'language_id' });
        language.hasMany(models.Film, { as: 'OriginalLanguage', foreignKey: 'original_language_id' });
      }
    }
  });

  return language;
};