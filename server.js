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

//establecer el tema de colors
colors.setTheme(config.color_theme);

//creando server
var server = http.createServer(function(req,res){
    //logeando la peticion
    console.log(`--> Peticion entrante: ${req.url}`.data);

    //mandando al index si no pide recursos
    //variable que almacenara la ruta absoluta del archivo a ser servido
    var resourcePath;
    if(req.url == "/")
    {
        //el cliente no especifica recurso
        resourcePath = './static/index.html';
    }
    else
    {
        //El cliente si especifica recursos
        //el STATIC_PATCH completa la ruta del cliente (req.url)
        //para acceder en el backend
        resourcePath = config.STATIC_PATCH + req.url;
    }
    //Extrayendo la extension de la url
    var extName =path.extname(resourcePath);

    //creando la variable contet_type
    /*var contentType;
    //asignando un content:contet_type
    //dependiendo de la url solicitada
    switch (extName) {
        case ".js":
            contentType ='text/javascript';
            break;
        case ".css":
            contentType ='text/css'
            break;
        case ".html":
            contentType ='text/html'
            break;
        default:
        contentType ='text/plain'
            break;
    }*/
    var contentType = mime.lookup(extName);
    //todo : verificar la existencia del recurso
    fs.exists(resourcePath,function(exists){
        if(exists){
            console.log('-->Recurso Existe...'.info)
            //El recurso existe y se intentara leer
          fs.readFile(resourcePath,function(err,content){
              //verifico si hubo un error en la lectura
              if(err){
                  console.log('-->Error en la lectura de recurso'.error);
                  //hubo error de lectura
                  res.writeHead(500,{
                'content-Ttpe':'text/html'
                  });
                  res.end('<h1>500: Error Interno</h1>');
              }else{
                  console.log(`--> Se Despacha recurso: ${resourcePath}`.info);
                res.writeHead(200,{
                    'Content-Type': contentType,
                    'Server':'ITGAM@0.0.1'
                });
                res.end(content,'utf-8');
              }
          });
        }
        else{
            console.log('-->El recurso solicitado no fue encontrado...'.info);
            //El recurso no existe
            res.writeHead(404,{
               // 'contet_type':contentType,
               'Contet_type':'text/html',
                'Server':'ITGAM@0.0.1'
            });
            res.end('<h1>404: Not Found</h1>')
        }
    })
   
});

//Poniendo en Ejecucion el Server
server.listen(config.PORT,config.IP,function(){
    console.log(`-->Server Escuchando en http://${config.IP}:${config.PORT}`.info);
});