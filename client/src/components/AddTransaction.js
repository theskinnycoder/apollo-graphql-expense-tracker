import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { GET_ALL_TRANSACTIONS } from '../App';

const CREATE_NEW_TRANSACTION = gql`
	mutation CreateNewTransaction($text: String!, $amount: Float!) {
		createTransaction(text: $text, amount: $amount) {
			id
			text
			amount
		}
	}
`;

const AddTransaction = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);

	const [CreateTransaction, { loading, error }] = useMutation(
		CREATE_NEW_TRANSACTION,
		{
			update(cache, { data: { createTransaction } }) {
				const { getTransactions } = cache.readQuery({
					query: GET_ALL_TRANSACTIONS,
				});

				cache.writeQuery({
					query: GET_ALL_TRANSACTIONS,
					data: {
						getTransactions: [...getTransactions, createTransaction],
					},
				});
			},
		}
	);

	const submitHandler = e => {
		e.preventDefault();
		CreateTransaction({ variables: { text, amount: +amount } });
	};

	return (
		<>
			<h3>Add New Transaction</h3>
			<form onSubmit={submitHandler}>
				<div className='form-control'>
					<label htmlFor='text'>Text</label>
					<input
						type='text'
						onChange={e => setText(e.target.value)}
						placeholder='Enter text...'
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='amount'>
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type='number'
						onChange={e => setAmount(e.target.value)}
						placeholder='Enter amount...'
					/>
				</div>
				<button type='submit' className='btn'>
					Add transaction
				</button>
				{loading && <PulseLoader />}
				{error && <p>Error :( Please try again</p>}
			</form>
		</>
	);
};

export default AddTransaction;
