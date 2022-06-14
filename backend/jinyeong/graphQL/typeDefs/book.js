const { gql } = require('apollo-server-koa');

const bookTypeDefs = gql`
  scalar Date

  type Query {
    book(id: ID!): Book
    books: [Book]
  }

  type Mutation {
    addBook(bookInfoId: Int! @constraint(min: 1)): AddBookMutationResponse
  }

  type AddBookMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type Book {
    id: ID!
    state: String
    bookInfo: BookInfo
    createdAt: Date
    updatedAt: Date
  }

  type BookInfo {
    id: ID!
    name: String
    category: BookCategory
    author: String
    publisher: String
    discription: String
    createdAt: Date
    updatedAt: Date
  }
  
  type BookCategory {
    id: ID!
    KDC: Int
    name: String
    createdAt: Date
    updatedAt: Date
  }
`;

module.exports = bookTypeDefs;
