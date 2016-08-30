# Sequelize Postgres Search

Postgres full-text search in Node.js using sequelize as its ORM.

# Install

```bash
npm i pg-search-sequelize
```

# Usage

After you create and define your materialized view model, which you can also do with this library, you would simply run:
```js
models.Film.searchByText('Mind'); // Returns "A Beautiful Mind" and "Eternal Sunshine of the Spotless Mind"

// The following command searches for instances that match the search query, 
// filters by those with releaseDate later than 2002, and orders the results by name field
models.Film.searchByText('Mind releaseDate:>2002 order:name'); // Returns only "Eternal Sunshine of the Spotless Mind"

// Or if you don't like strings, you can pass those properties in a JSON object
// The following returns the same as the code above; i.e. "Eternal Sunshine of the Spotless Mind"
models.Film.search('Mind', {
    where: { 
        releaseDate: {operator: '>', value: 2002} 
    }, 
    order: [['name', 'ASC']]
}
```

Now that you got a sneak peek of what this library enables you at the end, let's get to the setup steps:

### 1. Create Materialized View

If you use the sequelize migrations tool, you can use the `createMaterializedView(queryInterface, name, referenceModel, attributes, options)` helper function provided by this library like so:

```js
const QueryGenerator = require('../lib/queryGenerator');
const models = require('../models');

// The model we're creating the materialized view for
const referenceModel = models.Film;

const materializedViewName = 'film_materialized_view';

const attributes = { // field: weight. Every field has a weight to calculate how relevant the search results are.
   name: 'A', // name has the highest weight. 
   description: 'B',
   city: 'C' // city has a lower weight than title and description
}

const options = {
    include: [ // You can also include fields from associated models
        {
            model: models.Person,
            foreignKey: 'person_id',
            targetKey: 'id',
            associationType: 'belongsTo', // association types are: belongsTo, hasOne, or hasMany
            attributes: { // Those attributes get added to the materialized view's search document and will also be searched just like the other fields
              first_name: 'D',
              last_name: 'D',
              date_of_birth: 'D'
            }
        }
    ]
}
module.exports: {
    up: queryInterface => QueryGenerator.createMaterializedView(queryInterface, materializedViewName, referenceModel, attributes, options),
    
    down: queryInterface => QueryGenerator.dropMaterializedView(queryInterface, materializedViewName)
}
```

Here are the options that you can pass to the `createMaterializedView` method: 

- `tableName`: You can pass the tableName of the reference model.
- `include`: An array of the associated models' fields to add to the materialized view.

If you don't use the sequelize migration tool, feel free to create the materialized view in whatever way you prefer.

### 2. Define Materialized View Model

Define the model of your materialized view the same way you define any other sequelize models. The only difference is that you need to add `referenceModel` property to your model definition options. Then just construct a `SearchModel` out of the materialized view model you just defined.

```js
let FilmMaterializedView = sequelize.define('FilmMaterializedView', {
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    document: DataTypes.TEXT
}, {
    referenceModel: models.Film // The model for which we're defining the materialized view
});

FilmMaterializedView = new SearchModel(FilmMaterializedView); // Adds search, searchByText, and refresh class methods to the model.
```

### 3. That's It!

Now you can call `materializedViewModel.search(query, options)` or `materializedViewModel.searchByText(query)` to run a full-text search on your model and its associations.
Don't forget to refresh the materialized view to update it with the latest changes made to your model. One way to do that is to create an afterCreate, afterUpdate, and afterDelete hook on your model to refresh the materialized view:

```js
sequelize.define('Film', attributes, {
    hooks: {
        afterCreate: () => FilmMaterializedView.refresh(),
        afterUpdate: () => FilmMaterializedView.refresh(),
        afterDelete: () => FilmMaterializedView.refresh()
    }
});
```

Alternatively, you can have a job scheduler that refreshes your materialized view every x amount of time.