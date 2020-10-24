import React from 'react';
import Main from './components/main';
import './App.css';
import { Router } from '@reach/router';
import AccountDetails from './components/account_details';
import TransactionDetails from './components/transaction_details';

function App() {
  return (
    <div className="App">
      <Router>
        <Main path="/" />
        <AccountDetails path="/accounts/:id" />
        <TransactionDetails path="/transactions/:id" />
      </Router>
      
    </div>
  );
}

export default App;
