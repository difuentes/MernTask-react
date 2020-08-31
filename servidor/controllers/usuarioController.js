const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');



exports.crearUsuario = async (req,res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty()){    
        return res.status(400).json({errores: errores.array()})    
    }
    //extraer email y pass
    const {email,password}= req.body;
    try {
        
        //consutar si email existe en BD
        let usuario = await Usuario.findOne({email});

        //validacion de email
        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe !'})
        }

        //crear nuevo usuario
        usuario = new Usuario(req.body);

        //hashear pass
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);

        //guardar usuario
        await usuario.save();

        //crear y firmar el JWT
        const payload = {
            usuario:{
                id:usuario.id
            }
        }

        //fimar el JWT
        JWT.sign(payload,process.env.SECRETA,{
          expiresIn: 3600 //1 hora
        },(error,token)=>{
            if(error)throw error;
            res.json({token})
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error');
    }
}