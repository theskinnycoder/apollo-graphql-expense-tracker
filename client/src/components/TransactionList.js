import React from 'react';
import Transaction from './Transaction';
import { PulseLoader } from 'react-spinners';

const TransactionList = ({ res: { loading, error, data } }) => {
	if (loading) return <PulseLoader />;
	if (error) return `Error! ${error.message}`;
	return (
		<>
			<h3>History</h3>
			<ul className='list'>
				{data.getTransactions.map(transaction => (
					<Transaction key={transaction.id} transaction={transaction} />
				))}
			</ul>
		</>
	);
};

export default TransactionList;
