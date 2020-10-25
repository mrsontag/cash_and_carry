import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from '@reach/router';

const AccountForm = props => {
    const [ account, setAccount ] = useState({
        atype: "Checking",
        name: "",
        description: ""
    });

    const [ deletedisabled, setDeleteDisabled ] = useState(false);
    const Navigate = useNavigate();
    
    useEffect(() => {
        if(typeof(props.id) !== "undefined") {
            Axios.get("http://localhost:8000/accounts/" + props.id)
            .then(res => {console.log(res.data); setAccount(res.data[0]);})
            .catch(err => console.log(err));
            return;
        }
        setDeleteDisabled(true);
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

    const confirmDelete = () => {
        if( window.confirm("Are you sure you want to delete this account?")) {
            Axios.delete("http://localhost:8000/accounts/delete/" + props.id)
            Navigate("/")
        }
    }
    const openingText = () => {
        console.log("ran opening text");
        if(typeof(props.id) === "Undefined") {
            return(
                <>
                    <h1>Add new account:</h1>
                    
                </>
            ) 
        } else {
            return(
                <>
                    <h3>Update information for account {account.name}</h3>
                </>
            )
        }
    }

    return(
        <>
            { openingText() }

            <form onSubmit={submitForm}>
                <div>
                    <label className = "form_label" htmlFor="name">Name</label>
                    <select name="atype" id="atype" value={account.atype} onChange={(e) => setAccount({...account, atype: e.target.value})}>
                        <option value="Checking">Checking</option>
                        <option value="Savings">Savings</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Unsecured Loan" >Unsecured Loan</option>
                    </select>
                </div>
                <div>
                    <label className = "form_label"  htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={account.name} onChange={(e) => setAccount({...account, name: e.target.value}) }/>
                </div>
                <div>
                    <label className = "form_label"  htmlFor="description">Name</label>
                    <input type="text" name="description" id="description" value={account.description} onChange={(e) => setAccount({...account, description: e.target.value}) }/>
                </div>
                <button type="submit">Submit</button><button type="button" onClick={confirmDelete} disabled={deletedisabled}>Delete Account</button>
            </form>
            <Link to="/">Go home.</Link>
        </>
    )
}

export default AccountForm;