const { gql } = require('apollo-server-koa');

const reservationTypeDefs = gql`
  scalar Date
  
  type Query {
    reservation(id: ID!): Reservation
    reservations: [Reservation]
  }

  type Reservation {
    id: ID!
    user: User
    book: Book
    reservedDate: Date
    state: String
    createdAt: Date
    updatedAt: Date
  }
`;

module.exports = reservationTypeDefs;
