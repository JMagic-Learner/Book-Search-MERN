const { Book, User } = require('../models');

const resolvers = {
  Query: {
    me: async () =>
    {
      return User.find({});
    },

    book: async () => {
      return Book.find({});
    },
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
   Mutation: {
     login: async (parent, {email,password}) => {
       const user = await User.findOne({email});
       if (!user) { throw new AuthenticationError("No User found");
     }
       const correctPw = await user.isCorrectPassword(password);
       if (!correctPw) {throw new AuthenticationError('incorrect password');
      }

      return { token, user };
    },
     createUser: async (parent, args) => {
     const user = await User.create(args);
     return user;
     },
    saveBook: async (parent,  args) => {
       const updatedUser = await User.findOneAndUpdate(
         { _id },
        { $addToSet: { savedBooks: body }},
       { new: true },
       {runValidators: true }
       );
       return updatedUser;
    },
    deleteBook: async (parent, args) => {
      const updatedUser = await User.findOneAndUpdate(
        {_id: user._id},
        {$pull: {savedBooks: {bookId: parent.bookId }}},
        {new: true}
      );
      return updatedUser;
    },
  }
   
};

module.exports = resolvers;
