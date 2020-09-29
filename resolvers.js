const Transaction = require('./models/Transaction');
const { UserInputError } = require('apollo-server-express');

module.exports = {
	resolvers: {
		Query: {
			hello: () => 'Hello, World!',
			getTransactions: async () => {
				const allTransactions = await Transaction.find();
				return allTransactions;
			},
			getTransaction: async (_, { id }) => {
				try {
					const transaction = await Transaction.findById(id);
					return transaction;
				} catch (err) {
					return new UserInputError('Transaction not found!', {
						invalidArgument: id,
					});
				}
			},
		},

		Mutation: {
			createTransaction: async (_, { text, amount }) => {
				await Transaction.create({ text, amount });
				const allTransactions = await Transaction.find();
				return allTransactions;
			},
			deleteTransaction: async (_, { id }) => {
				try {
					const transaction = await Transaction.findById(id);
					await transaction.remove();
					return Transaction.find();
				} catch (err) {
					return new UserInputError('Transaction not found!', {
						invalidArgument: id,
					});
				}
			},
		},
	},
};
