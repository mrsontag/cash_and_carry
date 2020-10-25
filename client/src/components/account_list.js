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
            <h2>List of accounts:</h2>
            <table className="table">
                <tbody>
                    {accounts.length > 0 && accounts.map((account) => {
                        return(
                            <tr key={account._id}>
                                <td>
                                    <Link to={"/accounts/" + account._id}>{account.name} ({account.atype}) - {account.description}</Link>
                                </td>
                                <td>
                                    <Link to={"/accounts/edit/" + account._id}>Edit</Link>
                                </td>
                            </tr>
                        )})}
                </tbody>
            </table>
        </>
    )
}

export default AccountList;