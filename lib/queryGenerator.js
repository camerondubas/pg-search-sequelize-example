'use strict';

let Sequelize = require('sequelize');

function isEmptyObject(obj) {
  return obj === undefined || obj === null || typeof obj !== 'object' || Object.keys(obj).length < 1;
}

const QueryGenerator = {

  query: {
    document: '',
    joins: ''
  },

  createMaterializedView(queryInterface, materializedViewName, model, options) {
    options = options || {};
    let attributes = options.attributes;
    let primaryKey = this.col(options.primaryKeyField || model.primaryKeyField, options.tableName);
    options.tableName = options.tableName || model.tableName;
    return this.buildDocument(model, attributes, options).then(() =>
      queryInterface.sequelize.query(
        `CREATE MATERIALIZED VIEW ${this.table(materializedViewName)} AS ` +
        `SELECT ${primaryKey}, ${this.query.document} AS document ` +
        `FROM ${this.table(model) + this.query.joins};`
      )
    );
  },

  buildDocument(includeOrModel, attributes, options) {
    let include = includeOrModel, model = includeOrModel, isInclude = false;
    if (!(model instanceof Sequelize.Model)) {
      model = model.model;
      isInclude = true;
    }
    let allowNull = undefined;
    if (!isEmptyObject(options.modelDescription))
      allowNull = options.modelDescription[include.foreignKey] ? options.modelDescription[include.foreignKey].allowNull : true;

    return model.describe().then(modelDescription => {
      if (!isEmptyObject(attributes)) {
        if (this.query.document) this.query.document += ' || ';
        this.query.document += this.buildDocumentFromAttributes(attributes, modelDescription, include.as || model.tableName, allowNull);
      }
      if (isInclude) {
        let foreignKey = this.col(include.foreignKey, options.modelDescription[include.targetKey] ?  options.tableName : model.tableName);
        let targetKey = this.col(include.targetKey, options.modelDescription[include.targetKey] ? model.tableName : options.tableName);
        this.query.joins += ` LEFT OUTER JOIN ${this.table(model.tableName)}${include.as ? ' AS ' + include.as : ''} ON ${foreignKey} = ${targetKey}`;
      }
      return this.buildDocumentFromInclude(isInclude ? include : options, isInclude ? model.tableName : options.tableName, modelDescription);
    })
  },

  buildDocumentFromAttributes(attributes, modelDescription, tableName, areNullable) {
    return Object.keys(attributes).map(key => {
      if (typeof attributes[key] === 'string') {
        let attr = modelDescription[key];
        let shouldCast =
          !(attr.type === 'TEXT' ||
          attr.type === 'CHARACTER VARYING' ||
          attr.type === 'CHARACTER');

        let column = this.col(key, tableName);
        if (shouldCast) column = this.cast(column);
        if (areNullable || attr.allowNull) column = this.coalesce(column);
        return this.setWeight(this.toTSVector(column), attributes[key]);
      } else {
        throw new TypeError('Must be either a weight or attributes of model');
      }
    }).join(' || ');
  },

  buildDocumentFromInclude(options, tableName, modelDescription) {
    if (!isEmptyObject(options.include)) {
      return Array.isArray(options.include) ?
        Promise.all(options.include.map(include => this.buildDocument(include, include.attributes, {tableName, modelDescription}))) :
        this.buildDocument(options.include, options.include.attributes, {tableName, modelDescription});
    }
    return Promise.resolve();
  },

  dropMaterializedView(queryInterface, materializedViewName) {
    return queryInterface.sequelize.query(`DROP MATERIALIZED VIEW ${materializedViewName};`);
  },

  setWeight(field, weight) {
    return `setweight(${field}, '${weight}')`;
  },

  toTSVector(field) {
    return `to_tsvector(${field})`;
  },

  coalesce(field, fallback = '\'\'') {
    return `coalesce(${field}, ${fallback})`;
  },

  cast(field, type = 'TEXT') {
    return `${field}::${type}`;
  },

  col(field, model) {
    return `${model ? this.table(model) + '.' : ''}"${field}"`;
  },

  table(model) {
    return `"${typeof model === 'string' ? model : model.tableName}"`;
  }

};

module.exports = QueryGenerator;
