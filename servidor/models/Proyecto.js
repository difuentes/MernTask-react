const moongose = require('mongoose');

const ProyectoSchema = moongose.Schema({
    nombre:{
     type: String,
     requerired:true,
     trim:true
    },
    creador:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Usuario'
     
    },
    creado:{
        type: Date,
        default: Date.now()
    }
})

module.exports = moongose.model('Proyecto',ProyectoSchema)