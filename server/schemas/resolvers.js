const { AuthenticationError } = require('apollo-server-express');
const { User, Recipes } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('recipes');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('recipes');
    },
    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recipes.find(params).sort({ createdAt: -1 });
    },
    recipe: async (parent, { recipeId }) => {
      console.log(recipeId)
      return Recipes.findOne({ _id: recipeId });
    },
    getRecipes: async (parent, args, context) => {
      return Recipes.find({ title: {'$regex': args.filter, '$options': 'i'}});
    },
    searchIngredients: async (parent, args, context) => {
      return Recipes.find({ ingredients: {'$regex': args.filter, '$options': 'i'}});
    },
    me: async (parent, args, context) => {
      if (context.user) {
       const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
      return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Username and/or Password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Username and/or Password');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveRecipe: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedRecipes: input } },
            { new: true, runValidators: true }
        );
          console.log(input);
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedRecipes: { recipeId: recipeId } } },
            { new: true } 

        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

   
  },
};

module.exports = resolvers;