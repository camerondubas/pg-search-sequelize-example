'use strict';

let QueryGenerator = require('./queryGenerator');
let Util = require('../util');

class SearchModel {
  constructor(model) {
    model.search = (query, options) => SearchModel.search(model, query, options);
    return model;
  }

  static search(model, query, options = {}) {
    let referenceModel = model.referenceModel;

    if (query) query = QueryGenerator.toTSQuery(query);

    let attributes = [];
    if (!Util.isEmptyObject(options.attributes)) attributes = options.attributes;
    else if (!Util.isEmptyObject(model.options.scopes.search)) attributes = model.options.scopes.search.attributes;
    else if (!Util.isEmptyObject(model.options.defaultScope)) attributes = model.options.defaultScope.attributes;
    else attributes = Object.keys(model.attributes);

    let fields = {};
    attributes.forEach(attr => {
      if (attr !== 'document') fields[referenceModel.attributes[attr].field] = {
        model: referenceModel,
        as: attr
      }
    });

    let where = options.where || {};
    Object.keys(where).forEach(field => where[field].model = referenceModel);
    if (query) where.document = {operator: '@@', value: query};

    let orderBy = options.order || [];
    orderBy.forEach(field => field[0] = QueryGenerator.col(referenceModel.attributes[field[0]].field, referenceModel));
    if (query) orderBy.unshift([QueryGenerator.tsRank(QueryGenerator.col('document', model), query), 'DESC']);

    query = new QueryGenerator()
      .from(model)
      .select(fields)
      .leftOuterJoin(referenceModel, model)
      .where(where)
      .orderBy(orderBy)
      .getQuery();

    let queryOptions = {type: model.sequelize.QueryTypes.SELECT};
    return model.sequelize.query(query, queryOptions);
  }
}

module.exports = SearchModel;