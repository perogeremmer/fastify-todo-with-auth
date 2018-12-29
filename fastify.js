require('dotenv').config();

// Inisialisasi awal fastify.
const fastify = require('fastify')({
    logger: true //aktifkan ini untuk menerima log setiap request dari fastify.
});

//Fungsi ini untuk membuat kita bisa melakuakn post melalui www-url-encoded.
fastify.register(require('fastify-formbody'));

//Route yang dipisah dari root file.
fastify.register(require('./routes'));

// fastify.addHook('preHandler', async (request, reply, next) => {
//     await middleware.check(request, reply);
//     next();
// });


//Fungsi file root secara async.
const start = async () => {
    try {
        //Gunakan Port dari ENV APP_PORT, kalo ngga ada variable tersebut maka akan menggunakan port 3000
        await fastify.listen(process.env.APP_PORT || 3000);

        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1)
    }
};

//Jalankan server!
start();
