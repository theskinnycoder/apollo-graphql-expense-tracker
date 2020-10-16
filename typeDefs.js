import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Transaction {
		id: ID!
		text: String!
		amount: Float!
	}
	type Query {
		hello: String!
		getTransactions: [Transaction!]!
	}
	type Mutation {
		createTransaction(id: ID, text: String!, amount: Float!): Transaction!
		deleteTransaction(id: ID!): ID!
	}
`;

export default typeDefs;
