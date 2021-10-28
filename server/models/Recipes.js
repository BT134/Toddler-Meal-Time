const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String
  },
  ingredients: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  preptime: {
    type: Number,
    required: true,
  },
  cooktime: {
    type: Number,
    required: true,
  },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;