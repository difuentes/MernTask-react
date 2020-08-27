const moongose = require('mongoose');

const UsuarioSchema = moongose.Schema({
    nombre:{
     type: String,
     requerired:true,
     trim:true
    },
    email:{
        type: String,
        requerired:true,
        trim:true,
        unique: true
    },
    password:{
        type: String,
        requerired:true,
        trim:true
    },
    registro:{
        type: Date,
        default : Date.now()
    }
})

module.exports = moongose.model('Usuario',UsuarioSchema)