let response = require('../response');
let connection = require('../connection');
let moment = require('moment');

async function check(request, reply) {
    console.log("lewat middleware");
    let token = request.headers.authorization;
    let now = moment().format('YYYY-MM-DD HH:mm:ss').toString();
    let sql = "SELECT * FROM authentication WHERE id = ?";

    return new Promise((resolve) =>
        connection.query(sql, [token.toString()], function (error, rows) {
            if(error){
                console.log(error);
                return response.badRequest('', `${error}`, reply)
            }

            if(rows.length > 0){
                let message = moment(rows[0].expires_at).format('YYYY-MM-DD HH:mm:ss').toString() > now;
                if(message){
                    return resolve(true);
                }
                else{
                    return response.badRequest('', "Masa Aktif Token telah habis!", reply);
                }
            }
            else{
                return response.badRequest('', 'Token anda salah!', reply)
            }
        })
    );
}

module.exports = {
    check
};