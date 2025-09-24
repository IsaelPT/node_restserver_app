const express = require('express');
const cors = require('cors');
const { dbConexion } = require('../database/config');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conexion de db
        this.conectarDB();

        //Middleware
        this.middlewares();

        //Rutas
        this.routes();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    async conectarDB(){
        await dbConexion();
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