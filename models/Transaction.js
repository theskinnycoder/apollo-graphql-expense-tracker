import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
});

export default model('Transaction', transactionSchema);
