const accounts = require("../controllers/account.controller");

module.exports = app => {
    app.get('/accounts/', accounts.getAll);
    app.get('/accounts/:id', accounts.getOneByID);
    app.post('/accounts/new/', accounts.addNew);
    app.put('/accounts/:id/', accounts.updateOneByID);
    app.delete('/accounts/delete/:id', accounts.deleteOneByID);
}