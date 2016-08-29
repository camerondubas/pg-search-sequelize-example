'use strict';

module.exports = (sequelize, DataTypes) => {
  let film = sequelize.define('Film', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'film_id' },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    releaseYear: { type: DataTypes.INTEGER, allowNull: false, field: 'release_year' },
    rentalDuration: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 3, field: 'rental_duration' },
    rentalRate: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 4.99, field: 'rental_rate' },
    length: DataTypes.INTEGER,
    replacementCost: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 19.99, field: 'replacement_cost' },
    rating: DataTypes.STRING,
    specialFeatures: { type: DataTypes.TEXT, field: 'special_features' },
    fulltext: { type: DataTypes.STRING, allowNull: false },
    lastUpdate: { type: DataTypes.DATE, allowNull: false, field: 'last_update' }
  }, {
    tableName: 'film',
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ['fulltext']
      }
    },
    classMethods: {
      associate: models => {
        film.belongsToMany(models.Store, {
          through: models.Inventory,
          as: 'Stores',
          foreignKey: {
            name: 'film_id',
            allowNull: false
          },
          otherKey: 'store_id'
        });
        film.hasMany(models.Inventory, { foreignKey: { name: 'film_id', allowNull: false } });
        film.belongsTo(models.Language, { as: 'Language', foreignKey: { name: 'language_id', allowNull: false } });
        film.belongsTo(models.Language, { as: 'OriginalLanguage', foreignKey: 'original_language_id' });
      }
    }
  });

  return film;
};