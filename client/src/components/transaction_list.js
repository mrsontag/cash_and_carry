import React, {useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from '@reach/router';

const TransactionList = props => {
    const [ transactions, setTransactions ] = useState([]);
    
    useEffect(() => {
        let target = "http://localhost:8000/transactions/";
        if(typeof(props.account_id) !== "undefined") {
            target = target + "account/" + props.account_id;
        }
        console.log(target);
        Axios.get(target)
        .then(res => {console.log(res.data); setTransactions(res.data)})
        .catch(err => console.log(err));
    },[])


    if(transactions.length === 0) {
        return(
            <>
                <p>There are currently no transactions.</p>
            </>
        )
    };

    return(
        <>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <td>Date</td>
                        <td>Payee</td>
                        <td>Description</td>
                        <td>Type</td>
                        <td>Amount</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                {transactions.length > 0 && transactions.map((transaction) => {
                    return(
                        <tr key={transaction._id}>
                            <td>{Date.parse(transaction.date)}</td>
                            <td>{transaction.counterparty}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.xtype}</td>
                            <td>{transaction.amount}</td>
                            <td><Link to={"/transactions/" + transaction._id}>Details</Link></td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </>
    )
}

export default TransactionList;