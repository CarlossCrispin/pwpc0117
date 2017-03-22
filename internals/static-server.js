//Funcionalidades de servidor estatico
//cargando dependencias
var fs = require('fs'),
    mime = require('mime'),
    path = require('path'),
    colors = require('colors'),
    config = require('../config/config');
//Exportando funcionalidades de 
//servidor estatico
exports.serve =function(req,res){
    var resourcePath;
    if(req.url == "/")
    {
        //el cliente no especifica recurso
        resourcePath = path.resolve('./static/index.html');
    }else{
        //Obteniendo la ruta
        //absoluta del recurso que se desea servir
        var  resourcePath =
        path.resolve(config.STATIC_PATCH + req.url);

    }
    console.log(`-->Recurso solicitado: ${resourcePath}`.data);
    //extrayendo
    var extName =path.extname(resourcePath);

    var contentType = mime.lookup(extName);
    //todo : verificar la existencia del recurso
    fs.exists(resourcePath,function(exists){
        if(exists){
            console.log('-->Recurso Existe...'.info)
            //El recurso existe y se intentara leer
          fs.readFile(resourcePath,function(err,content){
              //verifico si hubo un error en la lectura
               var d = new Date(),
                horas= d.getHours(),
                minutos=d.getMinutes(),
                segundos=d.getSeconds(),
                hor =`${horas}:${minutos}:${segundos}`;
              if(err){
                  console.log('-->Error en la lectura de recurso'.error);
                  //hubo error de lectura
                  res.writeHead(500,{
                'content-Ttpe':'text/html'
                  });
                  res.end('<body background="../img/error.jpg"> <h1 style="color:cyan>'+
                     `--->500: Error Interno`+'</h1> </body>'); 
              }else{
                  console.log(`--> Se Despacha recurso: ${resourcePath}`.info);
                res.writeHead(200,{
                    
                    'Content-Type': contentType,
                    'Server':'ITGAM@0.0.1'
                });

                res.end(content ,'utf-8');
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
        res.end('<body background="../img/error.jpg"> <h1 style="color:red">'+
        `--->404: Not Found`+'</h1> </body>');  
        }
    })
}