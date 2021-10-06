const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    author: String!
    description: String!
    bookID: String!
    Image: String!
    Link: String!
    Title: String!

  }

  type User {
    _id: ID!
    Username: String!
    Password: String!
    Email: String!
    
  }

  type Query {
    book: [Book]
    user(_id: String): [User]
  }

`;

module.exports = typeDefs;
