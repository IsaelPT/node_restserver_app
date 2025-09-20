const express = require('express');
const cors = require('cors');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middleware
        this.middlewares();

        //Rutas
        this.routes();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use( express.static('public') )
    }

    lsiten() {
        this.app.listen( this.port, () => {
            console.log(`Servidor a la escucha en el puerto: ${this.port}`);
        } );
    }

}

module.exports = Server;