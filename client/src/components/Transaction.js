import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../App';
import { PulseLoader } from 'react-spinners';

const DELETE_TRANSACTION = gql`
	mutation DeleteTransactionByID($id: ID!) {
		deleteTransaction(id: $id)
	}
`;

const Transaction = ({ transaction }) => {
	const sign = transaction.amount < 0 ? '-' : '+';
	const [DeleteTransaction, { loading, error }] = useMutation(
		DELETE_TRANSACTION,
		{
			update(cache, { data: { deleteTransaction } }) {
				const { getTransactions } = cache.readQuery({
					query: GET_ALL_TRANSACTIONS,
				});

				cache.writeQuery({
					query: GET_ALL_TRANSACTIONS,
					data: {
						getTransactions: getTransactions.filter(
							txn => txn.id !== deleteTransaction
						),
					},
				});
			},
		}
	);

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}{' '}
			<span>
				{sign}
				{Math.abs(transaction.amount)}Rs
			</span>
			<button
				className='delete-btn'
				onClick={() => {
					DeleteTransaction({ variables: { id: transaction.id } });
				}}
			>
				x
			</button>
			{loading && <PulseLoader />}
			{error && <p>Error :( Please try again</p>}
		</li>
	);
};

export default Transaction;
