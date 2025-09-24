const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controller/usuarios.controller');

const { esRolValido,
        emailExiste,
        verificarUsuarioById } = require('../helpers/db-validator')
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
        check('nombre').notEmpty().withMessage('El nombre es obligatorio'),

        check('correo').notEmpty().withMessage('El correo es obligatoio')
        .isEmail().withMessage('Debe ser un email valido')
        .normalizeEmail()
        .custom( emailExiste ),

        check('password').notEmpty().withMessage('El password es obligatorio')
        .isLength({min: 6}).withMessage('El password debe de contener mas de 6 caracteres'),

        check('rol').custom( esRolValido ),

        validarCampos
], usuariosPost);

router.put('/:id', [
        check('id').isMongoId().withMessage('No es un id valido')
        .custom( verificarUsuarioById ),

        check('rol').custom( esRolValido ),

        validarCampos
], usuariosPut);

router.delete('/:id', [
        check('id').isMongoId().withMessage('No es un id valido')
        .custom( verificarUsuarioById ),

        validarCampos
], usuariosDelete);


module.exports = router;