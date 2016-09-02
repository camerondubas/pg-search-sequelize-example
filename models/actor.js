'use strict';

module.exports = (sequelize, DataTypes) => {
  let actor = sequelize.define('Actor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'actor_id'},
    first_name: {type: DataTypes.STRING(45), allowNull: false, field: 'first_name'},
    last_name: {type: DataTypes.STRING(45), allowNull: false, field: 'last_name'},
    lastUpdate: {type: DataTypes.DATE, allowNull: false, field: 'last_update'}
  }, {
    tableName: 'actor',
    timestamps: false,
    classMethods: {
      associate: models => {
        actor.belongsToMany(models.Film, {
          through: models.FilmActor,
          as: 'Films',
          foreignKey: {
            name: 'actor_id',
            allowNull: false
          },
          otherKey: 'film_id'
        });
        actor.hasMany(models.FilmActor, { foreignKey: { name: 'actor_id', allowNull: false } });
      }
    }
  });

  return actor;
};
