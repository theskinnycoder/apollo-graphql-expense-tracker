import { UserInputError } from 'apollo-server-express';
import Transaction from './models/Transaction';

const resolvers = {
	Query: {
		hello: () => 'Hello, World!',
		getTransactions: async () => {
			const allTransactions = await Transaction.find();
			return allTransactions;
		},
	},

	Mutation: {
		createTransaction: async (_, { text, amount }) => {
			const createdTransaction = await Transaction.create({ text, amount });
			return createdTransaction;
		},
		deleteTransaction: async (_, { id }) => {
			const deletedTransaction = await Transaction.findByIdAndDelete(id);
			if (!deletedTransaction)
				return new UserInputError('Transaction not found!', {
					invalidArgument: id,
				});
			return deletedTransaction._id;
		},
	},
};

export default resolvers;
