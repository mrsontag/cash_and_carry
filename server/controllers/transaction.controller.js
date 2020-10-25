const pool = require("../config/pg.config");

const getAll = (request, response) => {
    pool.query('SELECT * FROM "public"."Transactions"', (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const getOneByID = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM "public"."Transactions" WHERE _id = $1', [id], (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const getAllByAccountID = (request, response) => {
    const account_id = parseInt(request.params.account_id);
    pool.query('SELECT * FROM "public"."Transactions" WHERE account_id = $1', [account_id], (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const addNew = (request, response) => {
    const {xtype, date, amount, description, counterparty, account_id, accrual_id } = request.body;
    pool.query('INSERT INTO "public"."Transactions" (xtype, date, amount, description, counterparty, account_id, accrual_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())', [xtype, date, amount, description, counterparty, (typeof(account_id) === "undefined" ? 0 : account_id), (typeof(accrual_id)=== "undefined" ? 0 : accrual_id)], (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).send({ status: "Success!", result: results});
        }
    })
}

const deleteOneByID = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM "public"."Transactions" WHERE _id = $1', [id], (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).send({ status: "Success!", result: results});
        }
    })
}

module.exports = { getAll, getOneByID, getAllByAccountID, addNew, deleteOneByID };
