async function ok (values, message, reply) {
    return reply
    .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            code : 200,
            values : values,
            message : message,
        });
}

async function badRequest (values, message, reply) {
    return reply
        .code(400)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            code : 400,
            values : values,
            message : message,
        });
}

module.exports = {
    ok, badRequest
};