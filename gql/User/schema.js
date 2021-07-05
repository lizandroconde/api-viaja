//# DEPENDENCYS
import { gql } from "apollo-server";

export default gql`
  # SCHEMAS => USER
  type User {
    id: ID!
    name: String
    surname: String
    photo: String
    email: String
    username: String
    password: String
    location: String
    about_you: String
    available: Boolean
  }

  # TYPES EXTENDS => USER
  type TokenUser {
    status: Int
    message: String
    token: String
  }

  # type FavoritesTrip {
  #   trip: Trip
  #   title: String
  #   note: String
  # }

  # RESPONSES
  type ResponseAllUser {
    status: Int!
    message: String
    data: [User]
  }

  type ResponseUser {
    status: Int!
    message: String
    data: User
  }

  # INPUTS => USER
  input InputUser {
    name: String
    surname: String
    photo: Upload
    email: String
    username: String
    password: String
    location: String
    about_you: String
    favorites: [InputFavoritesTrip]
    bookings: [ID]
    reviews: [ID]
    available: Boolean
  }

  input InputAuthUser {
    email: String
    password: String
  }

  input InputFavoritesTrip {
    trip: ID
    title: String
    note: String
  }

  # QUERYS => USER
  extend type Query {
    getUsers: ResponseAllUser!
    getUser(id: ID!): ResponseUser!
    getLogIn: ResponseUser!
  }

  # MUTATIONS => USER
  extend type Mutation {
    newUser(input: InputUser!): ResponseUser!
    removeUser(id: ID!): ResponseUser!
    updateUser(id: ID!, input: InputUser!): ResponseUser!
    authUser(input: InputAuthUser!): TokenUser!
  }
`;
