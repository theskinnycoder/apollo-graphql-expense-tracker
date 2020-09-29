const { gql } = require('apollo-server-express');

module.exports = {
	typeDefs: gql`
		type Transaction {
			id: ID!
			text: String!
			amount: Float!
			createdAt: String!
		}
		type Query {
			hello: String!
			getTransactions: [Transaction!]
			getTransaction(id: ID!): Transaction!
		}
		type Mutation {
			createTransaction(id: ID, text: String!, amount: Float!): [Transaction!]!
			deleteTransaction(id: ID!): [Transaction!]
		}
	`,
};
