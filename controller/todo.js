let response = require('../response');
let connection = require('../connection');
let moment = require('moment');
let header = require('../helper/token');

async function get (request, reply) {
    let token = request.headers.authorization;
    let check = await header.check(token, reply);
    let sql = `SELECT * FROM todo WHERE user_id = ?`;

    let data = await new Promise((resolve) => connection.query(sql, [check.user_id], function (error, rows) {
            if(error){
                console.log(error);
                return response.badRequest('', `${error}`, reply)
            }

            if(rows.length > 0){
                let array = [];
                rows.forEach(element => {
                    array.push({
                        id: element.id,
                        title: element.title,
                        description: element.description,
                        created_at: moment(element.created_at).format('YYYY-MM-DD HH:mm:ss').toString()
                    });
                });

                return resolve(array);
            }
            else{
                return resolve([]);
            }
        })
    );

    return response.ok(data, '', reply);
}

async function show (request, reply) {

    let id = request.params.id;
    let token = request.headers.authorization;
    let check = await header.check(token, reply);
    let sql = `SELECT * FROM todo WHERE id = ? AND user_id = ?`;

    let data = await new Promise((resolve) =>
        connection.query(sql,
            [id, check.user_id], function (error, rows) {
                if(error){
                    console.log(error);
                    return response.badRequest('', `${error}`, reply)
                }

                return rows.length > 0 ? resolve({
                    id : rows[0].id,
                    title : rows[0].title,
                    description : rows[0].description,
                    created_at : moment(rows[0].created_at).format('YYYY-MM-DD HH:mm:ss').toString()
                }) : resolve({});
            })
    );

    return response.ok(data, '', reply);
}

async function store (request, reply) {

    let now = moment().format('YYYY-MM-DD HH:mm:ss').toString();
    let title = request.body.title;
    let description = request.body.description;
    let token = request.headers.authorization;
    let created_at = now;
    let updated_at = now;

    let check = await header.check(token, reply);
    let sql = `INSERT INTO todo (user_id, title, description, created_at, updated_at) values(?, ?, ?, ?, ?)`;

    let data = await new Promise((resolve) =>
        connection.query(sql,
            [check.user_id, title, description, created_at, updated_at], function (error, rows) {
            if(error){
                console.log(error);
                return response.badRequest('', `${error}`, reply)
            }

            return rows.affectedRows > 0 ? resolve(true) : resolve(false);
        })
    );

    let msg = data ? "Berhasil menambahkan data!" : "Tidak berhasil menambahkan data!";
    return response.ok({}, msg, reply);
}

async function update (request, reply) {

    let now = moment().format('YYYY-MM-DD HH:mm:ss').toString();
    let id = request.body.id;
    let title = request.body.title;
    let description = request.body.description;
    let token = request.headers.authorization;
    let created_at = now;
    let updated_at = now;

    let check = await header.check(token, reply);
    let sql = `UPDATE todo set title = ?, description = ?, updated_at = ?) values(?, ?, ?) WHERE id = ? AND user_id = ?`;

    let data = await new Promise((resolve) =>
        connection.query(sql,
            [title, description, created_at, updated_at, id, check.user_id], function (error, rows) {
                if(error){
                    console.log(error);
                    return response.badRequest('', `${error}`, reply)
                }

                return rows.affectedRows > 0 ? resolve(true) : resolve(false);
            })
    );

    let msg = data ? "Berhasil mengubah data!" : "Tidak berhasil mengubah data!";
    return response.ok({}, msg, reply);
}

async function destroy (request, reply) {

    let id = request.body.id;
    let token = request.headers.authorization;
    let check = await header.check(token, reply);
    let sql = `DELETE FROM todo WHERE id = ? AND user_id = ?`;

    let data = await new Promise((resolve) =>
        connection.query(sql,
            [id, check.user_id], function (error, rows) {
                if(error){
                    console.log(error);
                    return response.badRequest('', `${error}`, reply)
                }

                return rows.affectedRows > 0 ? resolve(true) : resolve(false);
            })
    );

    let msg = data ? "Berhasil menambahkan data!" : "Tidak berhasil menambahkan data!";
    return response.ok({}, msg, reply);
}

module.exports = {
    store, update, show, destroy, get
};