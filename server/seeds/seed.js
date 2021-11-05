const db = require('../config/connection');
const { Recipes } = require('../models');

const recipeData = require('./recipeData.json');

db.once('open', async () => {
  await Recipes.deleteMany({});

  const recipes = await Recipes.insertMany(recipeData);

  console.log('Recipes seeded!');
  process.exit(0);
});
