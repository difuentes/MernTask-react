const Tareas = require('../models/Tareas');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//Crear una tarea
exports.crearTarea = async(req,res)=>{

    console.log(req.body)
    //revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty()){    
        return res.status(400).json({errores: errores.array()})    
    }

    //extraer el proyecto y comprobar si existe
    const {proyecto} = req.body;

    try {

        const existeProyecto = await Proyecto.findById(proyecto);
        //revisar si proyecto existe
        if(!existeProyecto){
            return res.status(400).json({msg:'Proyecto no encontrado'})
        }
        //revisar si proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(400).json({msg:'No Autorizado'})
        }
        //creamos la tarea
        const tarea = new Tareas(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(400).send('hubo un error');
    }


}

//obtener tareas
exports.ObtenerTareas = async (req,res) => {
    
    //extraer el proyecto y comprobar si existe
    const {proyecto} = req.body;

    //extraemos el proyectos
    try {
        
        const existeProyecto = await Proyecto.findById(proyecto);
        //revisar si proyecto existe
        if(!existeProyecto){
            return res.status(400).json({msg:'Proyecto no encontrado'})
        }
        //revisar si proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(400).json({msg:'No Autorizado'})
        }
        //obtener las tareas por proyecto
        const tareas = await Tareas.find({proyecto})
        res.json({tareas});


    } catch (error) {
        console.log(error);
        res.status(400).send('hubo un error');
    }

}

//actualizar tarea
exports.actualizarTareas = async (req,res) =>{
    try {
        
        //extraer el proyecto y comprobar si existe
        const {proyecto,nombre,estado} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        const existeTarea = await Tareas.findById(req.params.id);
     
        //revisar si tarea existe
        if(!existeTarea){
            return res.status(400).json({msg:'tarea no existe'})
        }

        //revisar si proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(400).json({msg:'No Autorizado'})
        }
        
        //crear objeto con nueva informacion
        const tareaNueva = {}

        if(nombre){
            tareaNueva.nombre = nombre;
        }
        if(estado){
            tareaNueva.estado = estado;
        }
        //Guardar Tarea
        tarea = await Tareas.findByIdAndUpdate({_id : req.params.id}, tareaNueva,{new:true})
        res.json({tarea})
    } catch (error) {
        console.log(error);
        res.status(400).send('hubo un error');
    }
}

//eliminar una tarea 
exports.eliminarTarea =  async (req,res) =>{
    
  
    try {
        //extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;
        //si la tarea existe
        let tarea = await Tareas.findById(req.params.id);

        //revisar si proyecto existe
        if(!tarea){
            return res.status(400).json({msg:'tarea no encontrado'})
        }

        let existeProyecto = await Proyecto.findById(proyecto);

        //revisar si proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(400).json({msg:'No Autorizado'})
        }
        
        //Eliminar 
        await Tareas.findOneAndRemove({ _id: req.params.id})
        console.log(req.params.id);
        res.json({msg:'Tarea Eliminada'});


    } catch (error) {
        console.log(error);
        res.status(400).send('hubo un error');
    }

}
