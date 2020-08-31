const Proyecto = require('../models/Proyecto');
const {validationResult}= require('express-validator');

exports.crearProyecto = async(req,res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty()){    
        return res.status(400).json({errores: errores.array()})    
    }

    try {
        
        const proyecto = new Proyecto(req.body);
        //guardar el creador via JWT
        proyecto.creador = req.usuario.id;
        //Guardar proyecto
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ');
    }
}

//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async(req,res) =>{
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort(({creado:-1}));
        res.json({proyectos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ');
    }
}

//actualizar proyecto
exports.actualizarProyecto = async(req,res) =>{
    
    
    /**
    //revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty()){    
        console.log
        return res.status(400).json({errores: errores.array()})    
    }
     */
    //extraer informacion del proyecto
    const { nombre } = req.body;
    console.log(nombre);
    const nuevoProyecto = {};     
   
    //si contiene un nombre cambiar
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        
    
     //revisar el ID 
        let proyecto =  await Proyecto.findById(req.params.id);
        console.log(proyecto);
     //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }
     //verificar el creador del proyecyo
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'})
        }
     //actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id:req.params.id},{$set: nuevoProyecto},{new:true})
        res.json({proyecto})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ');
    }
}

//eliminar proyecto

exports.eliminarProyecto = async(req,res)=>{
    
    try {
        
        //revisar id
        let proyecto = await Proyecto.findById(req.params.id);
        console.log("desde eliminar"+proyecto);
        //si el proyecto existe o no
        if(!proyecto){
         return res.status(401).json({msg:'No Autorizado'});
        }
        //revificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        //eliminar el proyecto por id
        await Proyecto.findOneAndRemove({_id :req.params.id});
        res.json({msg:'Proyecto eliminado'})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ');
    }

   
}