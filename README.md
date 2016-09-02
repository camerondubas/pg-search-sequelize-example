# PG Search Sequelize - Example

Demonstration of how to use the `pg-search-sequelize` library search a film stores database's films and customers.

# Demo

Try out this example's demo [here](https://project-demo.herokuapp.com/search).

# Run it locally

Prerequisites: Node.js `v6.0.0+` and docker.

To start the server

```js
npm start
```

If you have docker installed on your machine, you can run the postgres server locally and then run the migrations on it by running:

```js
// run the postgres docker container
npm run start:db
// Run the migrations
npm run start:db:migrate
```

# How It Works

Our database design looks like this:

<img width="1187" alt="Database Diagram" src="https://cloud.githubusercontent.com/assets/12049480/18189524/8d5f6eae-7070-11e6-99eb-48b55dd2407f.png">

We want to be able to search films and customers. But we also want to be able to search for films by actor names or customers by the store they rented the movie from. All of this is defined in the migration files inside the `migrations` directory.

The models in the diagram above are defined in the `models` directory. In the `models/index.js` file, we loop over all the models and call `sequelize.import` on them, then we loop over the defined models to:

1. Create the associations among the models, 
1. Add the `referenceModel` to the materialized views models,
1. Make the models with the `search` flag `SearchModel` objects,
1. And convert the `afterSave` custom hooks into `afterCreate`, `afterUpdate`, and `afterDestroy` hooks. 

Finally, we expose two API endpoints `/film/:query` and `/customer/:query` and we start the express server on port `3000`