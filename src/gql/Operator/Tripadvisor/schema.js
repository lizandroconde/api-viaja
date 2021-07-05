//# DEPENDENCYS
import { gql } from "apollo-server";

export default gql`
  #ESQUEMA OPERADORE
 


  # MUTATIONS => OPERDORES
  extend type Mutation {
 
    getTripAdvisorData: Boolean,
    getLocale: Boolean,
  }
`;
