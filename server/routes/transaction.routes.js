const transactions = require("../controllers/transaction.controller");

module.exports = app => {
    app.get('/transactions/', transactions.getAll);
    app.get('/transactions/:id', transactions.getOneByID);
    app.get('/transactions/account/:account_id', transactions.getAllByAccountID);
    app.post('/transactions/new/', transactions.addNew);
}