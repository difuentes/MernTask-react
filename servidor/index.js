const express = require('express');

//conexion con mongoDB
const conectarDB = require('./config/db.js');

//crear el servidor
const app = express();

//conectar a MongoDB
conectarDB();

//habilitar express.json
app.use(express.json({extended:true}));

//puerto de la app
const PORT = process.env.PORT ||4000;

//import rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

//arancar la app
app.listen(PORT,()=>{
    console.log(`Express trabajando en puerto ${PORT}`)
})