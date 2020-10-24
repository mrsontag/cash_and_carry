import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TransactionList from './transaction_list';
import { navigate, useNavigate } from '@reach/router';

const AccountDetails = props => {
    const [ account, setAccount ] = useState({});
    const Navigate = useNavigate();
    
    useEffect(() => {
        if(typeof(props.id) !== "undefined") {
            Axios.get("http://localhost:8000/accounts/" + props.id)
            .then(res => {console.log(res.data); setAccount(res.data[0]);})
            .catch(err => console.log(err));
            return;
        }
        setAccount( {
            atype: "Checking",
            name: "",
            description: ""
        })
    },[]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(account);
        if(typeof(props.id) !== "undefined") {
            Axios.post("http://localhost:8000/accounts/new/", account)
            .then()
            .catch(err => console.log(err));
        } else {
            Axios.put("http://localhost:8000/accounts/" + props.id, account)
            .then()
            .catch(err => console.log(err));
        }
        Navigate("/");
    }
    return(
        <>
            <TransactionList account_id={props.id} />
            <form onSubmit={submitForm}>
                <label htmlFor="name">Name</label>
                <select name="atype" id="atype" value={account.atype} onChange={(e) => setAccount({...account, atype: e.target.value})}>
                    <option value="Checking">Checking</option>
                    <option value="Savings">Savings</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Unsecured Loan" >Unsecured Loan</option>
                </select>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={account.name} onChange={(e) => setAccount({...account, name: e.target.value}) }/>
                <label htmlFor="description">Name</label>
                <input type="text" name="description" id="description" value={account.description} onChange={(e) => setAccount({...account, description: e.target.value}) }/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AccountDetails;