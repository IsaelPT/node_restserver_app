require('dotenv').config();
const { config } = require('dotenv');
const Server = require('./models/server');


const server = new Server();

server.lsiten();