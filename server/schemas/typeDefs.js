const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    authors: String!
    description: String!
    bookID: String!
    image: String!
    link: String!
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    bookCount: Int!
    email: String!
    savedBooks: [Book]
  }

  type Auth {
    token: String!
    user: [User]
  }

  type bookInput {
    author: String! 
    description: String!
    title: String! 
    bookId: String! 
    image: String! 
    link: String!
  }

  type Query {
    me: [User]
    book: [Book]
    user(_id: String): [User]
  }

  type Mutation {
    login: (username: String!, email: String!, password: String!): Auth
    addUser: (username: String!, email: String!, password: String!): Auth
    saveBook: (input: bookInput): User
    removeBook: (bookId: String!): User
  }

`;

module.exports = typeDefs;
