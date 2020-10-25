import React from 'react';
import Main from './components/main';
import './App.css';
import { Router } from '@reach/router';
import AccountForm from './components/account_form';
import AccountTransactions from './components/account_details';
import TransactionDetails from './components/transaction_details';

function App() {
  return (
    <div className="App">
      <Router>
        <Main path="/" />
        <AccountTransactions path="/accounts/:id" />
        <AccountForm path="/accounts/edit/:id" />
        <TransactionDetails path="/transactions/:id" />
      </Router>
      
    </div>
  );
}

export default App;
