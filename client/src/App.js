import { gql, useQuery } from '@apollo/client';
import React from 'react';
import './App.css';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import Header from './components/Header';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';

export const GET_ALL_TRANSACTIONS = gql`
	query GetAllTransactions {
		getTransactions {
			id
			text
			amount
		}
	}
`;

const App = () => {
	const res = useQuery(GET_ALL_TRANSACTIONS);
	return (
		<div>
			<Header />
			<div className='container'>
				<Balance res={res} />
				<IncomeExpenses res={res} />
				<TransactionList res={res} />
				<AddTransaction />
			</div>
		</div>
	);
};

export default App;
