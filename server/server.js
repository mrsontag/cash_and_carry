const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 8000;

require("./controllers/account.controller");

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded( {extended: true})
);

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'});
});

const AllAccountRoutes = require("./routes/account.routes");
AllAccountRoutes(app);

const AllTransactionRoutes = require("./routes/transaction.routes");
AllTransactionRoutes(app);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});





