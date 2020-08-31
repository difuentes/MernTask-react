//router para Autg de usuarios
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear un proyecto 
//api/proyecto
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecyo es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
    
)

router.get('/',
    auth,
    proyectoController.crearProyecto
    
)

router.put('/:id',
    auth,
    proyectoController.actualizarProyecto
    
)

router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
    
)

module.exports = router;