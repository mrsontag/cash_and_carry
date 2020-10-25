import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Axios from 'axios';

const TransactionDetails = props => {
    const [ transaction, setTransaction ] = useState({
        xtype: "cash",
        date: "",
        description: "",
        counterparty: "",
        amount: 0,
        account_ID: 0
    });
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
            <h3>Update Transaction Details:</h3>
            <div>
                <label className="form_label" htmlFor="date">Date:</label>
                <DatePicker selected={Date.parse(transaction.date)} onChange={date => setTransaction({...transaction, date: date})} />
            </div>
            <div>
                <label className="form_label" htmlFor="counterparty">Counterparty:</label>
                <input className="d-inline-block" type="text" name="counterparty" id="counterparty" value={transaction.counterparty} onChange={(e) => setTransaction({...transaction, counterparty: e.target.value}) }/>
            </div>
            <div>
                <label className="form_label" htmlFor="description">Name</label>
                <input type="text" name="description" id="description" value={transaction.description} onChange={(e) => setTransaction({...transaction, description: e.target.value}) }/>
            </div>
            <div>
                <label className="form_label" htmlFor="amount">amount</label>
                <input type="text" name="amount" id="amount" value={transaction.amount} onChange={(e) => setTransaction({...transaction, amount: e.target.value}) }/>
            </div>
            <div>
                <label className="form_label" htmlFor="account_id">Account:</label>
                <select name="account_id" id="account_id" value={transaction.account_ID} onChange={(e) => setTransaction({...transaction, account_id: e.target.value})}>
                    {accounts.length > 0 && accounts.map((account, index) => {
                        return(<option key={index} value={account.id}>{account.name} - {account.description}</option>
                        )})}    
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default TransactionDetails;