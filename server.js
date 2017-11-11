// Cargando modulos de node
const express = require("express"),
      path = require("path"),
      config = require("./server/configure"),
      mongoose = require('mongoose') ;
 var  app = express();


//Estableciendo unas variables de entorno 
app.set("port", process.env.PORT || 12000);
app.set("ip",process.env.IP || "0.0.0.0");
app.set("depmode", process.env.DEPMODE || "cdn")

//Configuracion especia, path.join se usa para unir la ruta por los diferentes sistemas operativos
app.set("views",path.join(__dirname,"views"));


//Aplicando configuraciones generales
app = config(app);

mongoose.connect('mongodb://cuachi:1234@ds155315.mlab.com:55315/picgam');
mongoose.connection.on('open',()=>{
      console.log('>Conexión con base de datos exitosa');
});

//Consultado las variables de entorno de la aplicacion 
const IP = app.get("ip"),
      PORT = app.get("port");

//Iniciando el servidor 
app.listen(PORT,IP,(err)=>{
    if(err)
    {
      console.log(`> Error en el server.js ln32: ${err}`);
      
    }
    console.log(`> Server escuchando en http://${IP}:${PORT}...`);
    });
