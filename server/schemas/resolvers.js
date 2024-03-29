const { User } = require('../models');
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user ) {
      const userdata = await User.findOne({ _id: context.user._id}).select(
        "-__v -password");
      return userdata;
      }
      throw new AuthenticationError('you are not logged in');
    },
  },

  

   Mutation: {
     login: async (parent, { email, password}) => {
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("login mutation has been called from resolvers.js (server)");
       const user = await User.findOne({email});
       if (!user) { throw new AuthenticationError("No User found");
     }
       const correctPw = await user.isCorrectPassword(password);
       if (!correctPw) {throw new AuthenticationError('incorrect password');
      }
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

     addUser: async (parent, args) => {
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("addUser mutation has been called from resolvers.js (server)");
     const user = await User.create(args);
     const token = signToken(user);
     console.log("this is the user: " + user);
     console.log("This is the token being passed through: " + token);
     return {token, user};
     },

    saveBook: async (parent, { input }, context) => {
      if (context.user) {
       const updatedUser = await User.findByIdAndUpdate(
         { _id: context.user._id },
        { $addToSet: { savedBooks: input }},
       { new: true },
       {runValidators: false }
       );
      
       return updatedUser;
      }
      throw new AuthenticationError("You are not logged in");
    },
// Translating from user-controller.js
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        {_id: context.user._id},
        {$pull: {savedBooks: {bookId: bookId }}},
        {new: true}
      
      );
      return updatedUser;
    }
    throw new AuthenticationError("You are not logged in");
    }
  }
   
};

module.exports = resolvers;
