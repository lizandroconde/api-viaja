//# DEPENDENCYS
import { gql } from "apollo-server";

//## RESOLVERS
//# IMPORT USER
import R_User from "./User/resolvers";
import R_Operator from "./Operator/resolvers";
import R_Operator_Tripadvisor from "./Operator/Tripadvisor/resolvers";

//# EXTENDS QUERYS && MUTATIONS
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

//## SCHEMAS | TYPEDEFS
import T_User from "./User/schema";
import T_Operator from "./Operator/schema";
import T_Operator_Tripadvisor from "./Operator/Tripadvisor/schema";

//# EXPORT THE ALL RESOLVERS
export const resolvers = [R_User, R_Operator,R_Operator_Tripadvisor];

//# EXPORT THE ALL TYPEDEFS
export const typeDefs = [linkSchema, T_User, T_Operator,T_Operator_Tripadvisor];
