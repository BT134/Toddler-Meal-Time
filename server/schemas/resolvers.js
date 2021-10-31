const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe } = require('../models');
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
      return Recipe.find(params).sort({ createdAt: -1 });
    },
    recipe: async (parent, { recipeId }) => {
      return Recipe.findOne({ _id: recipeId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedRecipe');
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

    saveRecipe: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedRecipe: {
                recipeId: args.recipeId,
                title: args.title, 
                image: args.image,
                ingredients: args.ingredients,
                method: args.method, 
                perptime: args.preptime,
                cooktime: args.cooktime,
            } } },
            { new: true, runValidators: true }
        );
  
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  
    removeRecipe: async (parent, { recipeId, params }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedRecipe: { recipeId: params.recipeId } } },
            { new: true } 

        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

   
  },
};

module.exports = resolvers;