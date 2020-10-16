import React from 'react';
import { PulseLoader } from 'react-spinners';

const Balance = ({ res: { loading, error, data } }) => {
	if (loading) return <PulseLoader />;
	if (error) return `Error! ${error.message}`;
	const amounts = data.getTransactions.map(transaction => transaction.amount);
	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
	return (
		<>
			<h4>Your Balance</h4>
			<h1>{total}Rs</h1>
		</>
	);
};

export default Balance;
