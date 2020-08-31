//router para Autg de usuarios
const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasControllers');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


//api/tareas
//crear una tarea 

router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea
    
)

router.get('/',
    auth,
    tareasController.ObtenerTareas
)

router.put('/:id',
    auth,
    tareasController.actualizarTareas
)

router.delete('/:id',
    auth,
    tareasController.eliminarTarea
)

module.exports = router;