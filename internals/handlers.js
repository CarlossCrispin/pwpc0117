var staticServer =require("./static-server");
//cargando una libreria que permita parsear la Informacion
//de formularios
var querystring=require('querystring');
//Archivo que contiene los manejadores
//correspondientes al "api" de mi aplicacion
//module.exports = {
   // "/getautorinfo":function(req,res){
var author={
    "name":"Crispin Gomez Juan Carlos, Emmanuel Gomez Luna ",
    "departament":"visual y manager de la empresa",
    "university":"la Sanfe"
};
       //declaracion de manejadores 
       var getAuthorInfo=function(req,res){
           //estableciendo el mime apropiado para dar a conocer al navegador
           //que se enviara un jason

           res.writeHead(200,{
               "Content-Type":"application/json"
           });
           //serializar la respuesta
        var jsonResponse=JSON.stringify(author);
        res.end(jsonResponse);
       }
       /* console.log("-->Respondiendo Informacion del autor...");
        res.write('--> Name: Carlos Crispin');
        res.write('--> Departament: Visual');
        res.write('--> Location: Sanfelipe es punk');
        res.end();*/
    
    //"/getservername":function(req,res)
    var getServerName= function(req,res){
        console.log('--> Respondiendo nombre del Server...');
        res.end(' ----->  Leviatan >:( ');
    }
   
    var getServerTime = function(req,res){
         var d = new Date(),
                horas= d.getHours(),
                minutos=d.getMinutes(),
                segundos=d.getSeconds(),
                hora =(`${horas}:${minutos}:${segundos}`);
         if(horas>=0 &&horas <12){
          console.log('--> Respondiendo la hora del Server...'.info);
        res.end('<body background="../img/manana.jpg"><h1 style="color:cyan">'+
        `-->Buenos Días la hora actual del server es: ${hora}`+'</h1> </body>'); 
        
        }
     if(horas>=12 &&horas <18){
       console.log('--> Respondiendo la hora del Server...'.info);
        res.end('<body background="../img/tarde.jpg alt=Imagen"> <h1 style="color:cyan">'+
        `-->Buenas Tardes la hora actual del server es: ${hora}`+'</h1> </body>');  
    }
       if(horas>=18 &&horas <24){
        console.log('--> Respondiendo la hora del Server...'.info);
        res.end('<body background="../img/noche.jpg"> <h1 style="color:cyan">'+
        `-->Buenas Noches la hora actual del server es: ${hora}`+'</h1> </body>');  
    }
 }
 var getPostRoot =function(req,res){
     //Viendo el tipo de peticion
     if(req.method === "POST")
     {
         //procesar el formular
         var postData = "";

         //create Listener, event driven programing
         //detectar un evento
         //la llegada de datos
         req.on("data",function(dataChunk){
            postData += dataChunk;
            //"" --->""+Crispin"-->"Crispin"-->"Crispin"+ "?apellido:Gomez"-->"Crispin Gomez"
            //Agregando Seguridad al asunto
            if(postData.length>1e6){
                //destruir la conexion
                console.log("-->Actividad maliciosa detectada por parte de un Cliente");
                req.connection.destroy();
            }
         });
         //registrando otro listener ante un cierre de conexion 
         res.on("end",function(){
             //Rescatar los datos recividos del cliente 
             console.log(`--> Data REcived: ${postData}`.data);
             var data = querystring.parse(postData);

             //replicar los datos recibidos
             res.writeHead(200,{
                 'Content-Type':'text/html'
             });
             //Respondiendo con una replica de los datos recividos 
             res.write('<u1>');
             for(var key in data){
                 if(data.hasOwnProperty(Key)){
                     res.write(
                         `<li>${key.toString().toUpperCase()} : ${data[key]}</li>`
                     );
                 }
             }
             //cierro la url y la conexion
             res.end("</u1>");
         });
     }
     else{
         //se sirve el index.html
         staticServer.serve(req,res);
     }
 }

var handlers={};
handlers["/"]=getPostRoot;
handlers["/getautorinfo"]=getAuthorInfo;
handlers["/getservername"]=getServerName;
handlers["/getservertime"]=getServerTime;
module.exports = handlers;