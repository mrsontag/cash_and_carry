const Pool = require('pg').Pool;
const { login_credentials } = require('./secrets');

const pool = new Pool({
    user: login_credentials.user,
    host: 'localhost',
    database: 'cash_and_carry_1',
    password: login_credentials.password,
    port: 5432,
})

module.exports = pool;