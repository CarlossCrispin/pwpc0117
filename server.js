//cargar el modulo http
var http = require('http');
//cargar modulo fs
var fs = require('fs');
//cargar modulo path--rutas
var path = require('path');
// cargando colors
var colors =require('colors');
//cargando el modulo mime
var mime = require('mime')
//cargando configuraciones
var config = require("./config/config");
//importando los handlers
var handlers = require('./internals/handlers');
//importo la funcionalidad del servidor estatico
var staticServer = require('./internals/static-server');
//establecer el tema de colors
colors.setTheme(config.color_theme);

//creando server
var server = http.createServer(function(req,res){
    //logeando la peticion
    console.log(`--> Peticion entrante:${req.url}`.data);

    //mandando al index si no pide recursos
    //variable que almacenara la ruta absoluta del archivo a ser servido
    //var resourcePath;
    
     //verificando si la url corresponde
     //a un comando de la API
    if(typeof(handlers[req.url]) =='function'){
        //existe el manejador en mi API
        //entonces mando a ejecutar el
        //manejador con los parametros que pide
        handlers[req.url](req,res);
    }else{
        //no existe manejador en mi API
        //entonces intento servir la url
        //como recurso estatico
        staticServer.serve(req,res);
    }
   
});
//Poniendo en Ejecucion el Server
server.listen(config.PORT,config.IP,function(){
    console.log(`-->Server Escuchando en http://${config.IP}:${config.PORT}`.info);
});