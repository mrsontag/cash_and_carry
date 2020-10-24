import React from 'react';
import AccountList from './account_list';
import AccountDetails from './account_details';
import TransactionList from './transaction_list';
import TransactionDetails from './transaction_details';

const Main = () => {
    return (
        <div>
            <AccountList />
            <AccountDetails />
            <TransactionList />
            <TransactionDetails />
        </div>
    )
}

export default Main;