const pool = require("../config/pg.config");

const getAll = (request, response) => {
    pool.query('SELECT * FROM "public"."Accounts"', (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const getOneByID = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM "public"."Accounts" WHERE _id = $1', [id], (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).json(results.rows)
        }
    })
}


const addNew = (request, response) => {
    pool.query('INSERT INTO "public"."Accounts" (atype, name, description, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())', [request.body.atype, request.body.name, request.body.description], (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).send({ status: "Success!", result: results});
        }
    })
}


const updateOneByID = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('UPDATE "public"."Accounts" SET atype = $2, name = $3, description = $4, updated_at = NOW() WHERE _id = $1', [id, request.body.atype, request.body.name, request.body.description], (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const deleteOneByID = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM "public"."Accounts" WHERE _id = $1', [id], (error, results) => {
        if (error) {
            response.status(200).send({status: "Request failed", result: error })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

module.exports = { getAll, getOneByID,  addNew, updateOneByID, deleteOneByID };
