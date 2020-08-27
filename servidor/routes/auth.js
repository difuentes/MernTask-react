//router para Autg de usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authcontroller');

//crear un usuario 
//api/auth
router.post('/',
    [
        check('email','Agregar un email valido').isEmail(),
        check('password','El password debe tener un minimo de 8 caracteres').isLength({min:8})
        
    ],authController.autenticarUsuario
    
)

module.exports = router;