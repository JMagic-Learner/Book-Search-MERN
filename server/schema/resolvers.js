const { Book, User } = require('../models');

const resolvers = {
  Query: {
    book: async () => {
      return Book.find({});
    },
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
  // Mutation: {
  //   createUser: async (parent, args) => {
  //     const user = await User.create(args);
  //     return user;
  //   },
    // // createBook: async (author, { _id, techNum }) => {
    // //   const vote = await Matchup.findOneAndUpdate(
    // //     { _id },
    // //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    // //     { new: true }
    // //   );
    // //   return vote;
    // },
  
};

module.exports = resolvers;
