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
    type: [String],
  },
  method: {
    type: [String],
  },
  preptime: {
    type: Number,
  },
  cooktime: {
    type: Number,
  },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;