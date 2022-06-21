const { gql } = require('apollo-server-koa');

const rentalTypeDefs = gql`
  scalar Date
  
  type Query {
    rental(id: ID!): Rental
    rentals: [Rental]
  }

  type Rental {
    id: ID!
    user: User
    book: Book
    rentalDate: Date
    returnDate: Date
    dueDate: Date
    isExtended: Boolean
    createdAt: Date
    updatedAt: Date
  }
`;

module.exports = rentalTypeDefs;
