const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');


//login de usuarios (return "Token")
exports.autenticarUsuario = async(req,res)=>{

     
     try {
         //extraer el email y pass
            const  {email,password} = req.body;
            console.log(req.body);
        //revisar que sea usuario registrado por email
        let usuario = await Usuario.findOne({email});
        console.log(usuario)
        //revisar si usuario existe
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'})
        }
        //revisar el password 
        const passCorrecto = await bcryptjs.compare(password,usuario.password)
        //revisar contraseña correcta
        if(!passCorrecto){
            return res.status(400).json({msg:'password incorrecto' })
        }
        //Si todo es correcto crear y firmar el JWT
        const payload = {
            usuario:{
                id:usuario.id
                     }
        };
        //fimar el JWT
        JWT.sign(payload,process.env.SECRETA,{
        expiresIn: 3600 //1 hora
        },(error,token)=>{
            if(error)throw error;
            res.json({token})
        })

     } catch (error) {
         console.log(error);
     }
}

//retorna datos del usuario logeado 
exports.usuarioAutenticado = async(req,res)=>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"hubo un error"})
    }
} 