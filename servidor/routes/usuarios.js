//router para crear usuarios

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');

//crear un usuario 
router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password debe tener un minimo de 8 caracteres').isLength({min:8}),
        check('email','Agregar un email valido').isEmail()
    ],
    usuarioController.crearUsuario
)

module.exports = router;