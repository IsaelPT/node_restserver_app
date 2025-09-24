const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .limit(Number( limite ))
            .skip(Number( desde ))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario =  new Usuario({nombre, correo, password, rol});

    // Encryptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    
    // Guardar el usuario
    await usuario.save();

    res.json({
        usuario,
    });
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { __id, password, google, correo, ...resto } = req.body;

    // TODO: validar contra bd

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );
    res.json(usuario);
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}