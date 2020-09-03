//router para Autg de usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authcontroller');
const auth = require('../middleware/auth')

//inicio de sesion
//api/auth

router.post('/',
    authController.autenticarUsuario
    
)

router.get('/',
   auth, 
   authController.usuarioAutenticado
    
)


module.exports = router;