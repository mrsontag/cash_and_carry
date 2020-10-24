import React, {useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from '@reach/router';

const AccountList = () => {
    const [ accounts, setAccounts ] = useState([]);
    
    useEffect(() => {
        Axios.get("http://localhost:8000/accounts/")
        .then(res => {console.log(res.data); setAccounts(res.data)})
        .catch(err => console.log(err));
        
    },[])
    return(
        <>
            <ul>
                {accounts.length > 0 && accounts.map((account) => {
                    return(
                        <li key={account._id}><Link to={"/accounts/" + account._id}>{account.name} ({account.atype}) - {account.description}</Link></li>
                    )})}
            </ul>
        </>
    )
}

export default AccountList;