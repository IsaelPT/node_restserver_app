
const Role = require('../models/rol');
const Usuario = require('../models/usuario');

// Verificar si el rol es valido
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if( !existeRol ){ 
        throw new Error(`El rol ${rol} no existe`);
            
    }
}

// Verificar si el correo existe
const emailExiste = async (correo) => {
    
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error('El correo ya esta registrado')
    }
}

// Verificar si el id existe
const verificarUsuarioById = async ( id ) => {
    
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    verificarUsuarioById
}