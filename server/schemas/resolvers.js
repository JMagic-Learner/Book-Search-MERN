const { Book, User } = require('../models');
const { AuthenticationError } = require('../utils/auth');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user ) {
      const userdata = await User.findOne({ _id: context.user._id});
      return userdata;
      }
      throw new AuthenticationError('you are not logged in');
    },
  },

  

   Mutation: {
     login: async (parent, { email, password}) => {
       const user = await User.findOne({email});
       if (!user) { throw new AuthenticationError("No User found");
     }
       const correctPw = await user.isCorrectPassword(password);
       if (!correctPw) {throw new AuthenticationError('incorrect password');
      }
      const token = signToken(user);
      return { token, user };
    },

     addUser: async (parent, args) => {
     const user = await User.create(args);
     const token = signToken(user);
     return {token, user};
     },

    saveBook: async (parent, args, context) => {
      if (context.user) {
       const updatedUser = await User.findOneAndUpdate(
         { _id: context.user._id },
        { $addToSet: { savedBooks: args.input }},
       { new: true },
       {runValidators: true }
       );
      
       return updatedUser;
      }
      throw new AuthenticationError("You are not logged in");
    },
// Translating from user-controller.js
    removeBook: async (parent, args, context) => {
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
