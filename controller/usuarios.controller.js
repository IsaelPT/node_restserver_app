const { response } = require('express');

const usuariosGet = (req, res) => {

    const params = req.query;

    res.json({
        params,
        msg: 'Hello World get controller'
    });
}
const usuariosPost = (req, res) => {
    const body = req.body;

    res.json({
        body,
        msg: 'Hello World post controller'
    });
}
const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        id,
        msg: 'Hello World put controller'
    });
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Hello World delete controller'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}