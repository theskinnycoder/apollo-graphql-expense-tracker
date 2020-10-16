import React from 'react';
import { PulseLoader } from 'react-spinners';

const IncomeExpenses = ({ res: { loading, error, data } }) => {
	if (loading) return <PulseLoader />;
	if (error) return `Error! ${error.message}`;
	const amounts = data.getTransactions.map(transaction => transaction.amount);
	const income = amounts
		.filter(item => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);
	const expense = (
		amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
		-1
	).toFixed(2);
	return (
		<div className='inc-exp-container'>
			<div>
				<h4>Income</h4>
				<p className='money plus'>{income}Rs</p>
			</div>
			<div>
				<h4>Expense</h4>
				<p className='money minus'>{expense}Rs</p>
			</div>
		</div>
	);
};

export default IncomeExpenses;
