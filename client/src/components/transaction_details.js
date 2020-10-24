import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const TransactionDetails = props => {
    const [ transaction, setTransaction ] = useState({});
    const [accounts, setAccounts ] = useState({});

    useEffect(() => {
        Axios.get("http://localhost:8000/accounts/")
        .then(res => {console.log("Here is the account list: " + res.data); setAccounts(res.data)})
        .catch(err => console.log(err));

        if(typeof(props.id) !== "undefined") {
            Axios.get("http://localhost:8000/transactions/" + props.id)
            .then(res => {console.log(res.data); setTransaction(res.data[0]);})
            .catch(err => console.log(err));
            return;
        }
        
        
        setTransaction( {
            atype: "Checking",
            name: "",
            description: ""
        })
    },[]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(transaction);
        /*Axios.post("http://localhost:8000/transactions/new/", transaction)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        */
    }
    return(
        <form onSubmit={submitForm}>
            <label htmlFor="name">Name</label>
            <input type="text" name="xtype" id="xtype" value={transaction.xtype} onChange={(e) => setTransaction({...transaction, xtype: e.target.value})} />
            <label htmlFor="counterparty">counterparty:</label>
            <input type="text" name="counterparty" id="counterparty" value={transaction.counterparty} onChange={(e) => setTransaction({...transaction, counterparty: e.target.value}) }/>
            <label htmlFor="description">Name</label>
            <input type="text" name="description" id="description" value={transaction.description} onChange={(e) => setTransaction({...transaction, description: e.target.value}) }/>
            <label htmlFor="amount">amount</label>
            <input type="text" name="amount" id="amount" value={transaction.amount} onChange={(e) => setTransaction({...transaction, amount: e.target.value}) }/>
            <select name="account_id" id="atype" value={transaction.account_ID} onChange={(e) => setTransaction({...transaction, account_id: e.target.value})}>
                {accounts.length > 0 && accounts.map((account, index) => {
                    return(<option value={account.id}>{account.name} - {account.description}</option>
                    )})}
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}

export default TransactionDetails;