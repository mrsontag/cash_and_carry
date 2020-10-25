import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TransactionList from './transaction_list';
import { Link } from '@reach/router';

const AccountDetails = props => {
    const [ account, setAccount ] = useState({
        atype: "Checking",
        name: "",
        description: ""
    });
    
    useEffect(() => {
        Axios.get("http://localhost:8000/accounts/" + props.id)
        .then(res => {console.log(res.data); setAccount(res.data[0]);})
        .catch(err => console.log(err));
    },[]);


    return(
        <>
            <h3>Details for account: {account.name}</h3>
            <p>Account Name: {account.name}</p>
            <p>Account Type: {account.type}</p>
            <p>Account Description: {account.description}</p>
            <Link to={"/accounts/edit/" + props.id}>Edit Account</Link>
            <h3>Transactions for account {account.name}</h3>
            <TransactionList account_id={props.id} />
            <Link to="/">Go home.</Link>
        </>
    )
}

export default AccountDetails;