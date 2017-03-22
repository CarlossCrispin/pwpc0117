//Archivo que contiene los manejadores
//correspondientes al "api" de mi aplicacion
//module.exports = {
   // "/getautorinfo":function(req,res){

var author={
    "name":"Crispin Gomez Juan Carlos",
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
        res.end('<body background="../img/manana.jpg"> <h1 style="color:cyan">'+
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

var handlers={};
handlers["/getautorinfo"]=getAuthorInfo;
handlers["/getservername"]=getServerName;
handlers["/getservertime"]=getServerTime;
module.exports = handlers;