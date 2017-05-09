var staticServer =require("./static-server");
var config = require("../config/config");
var mongo = require("mongodb").MongoClient;

var url = config.dbStringConnection;
console.log(`BD : ${url}`);
//var mongo = require('mongodb').MongoClient;
//var url = 'mongodb://127.0.0.1:27017/Condominio'
//var url = 'mongodb://carlos:crispin@ds131511.mlab.com:31511/condominio'

//cargando una liberia que
//permite persear la informacion
//de formularios
var querystring = require('querystring');
//Archivo que contiene los
//manejadores correspondientes
//al "api" de mi aplicacion 
var colors= require('colors');
var author = {
    "name": "Crispin Gomez Juan Carlos",
    "department": "Visual de la empresa",
    "university": "La SnFe"
};

//manejadores
var getAuthorInfo = function (req, res) {
    //estableciendo el mime apropiado
    //para dar a conocer al navegador
    //que se enviara un json
    res.writeHead(200,{
        "Content-Type":"application/json"
    });
    //serializar
    var jsonResponse =JSON.stringify(author);
    res.end(jsonResponse);
}

 
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
var getPostRoot = function(req, res){
    //viendo el tipo de peticion
    if(req.method==="POST"){
        //Procesar un formulario
        var postData="";
        //create a listener
        //event driven programming
        //creando un listener ante
        //la llegada de datos
        req.on("data",function(dataChunk){
            postData += dataChunk;//concatenacion
            //""
            //""+emmas
            //"emmas"
            //"emmas"+"apellido:gomez"
            //"emmas apellido:gomez"
            //agregando seguridad al asunto
            if(postData.length >1e6){
                //Destruir a conexion
                console.log("> Actividad maliciosa detectada por parte de un cliente D:")
                req.connection.destroy();
            }
        });
        //registrando otro listener ante un cierre
        //de conexion
        req.on("end",function(){
            //rescatar los datos recibidos 
            //del cliente
            console.log(`>Data Received: ${postData}`.data);
            var data = querystring.parse(postData);
            //Replicar los datos recibidos
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            //respondiendo con los datos recibidos
            
 mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection('inquilinos')
      //operacion de mongo respuesta 
      collection.insert(data, function(err, documents) {
        if (err) { 
            console.log(err);
            res.write(` <body style="background:darkcyan">
             <h1 style="color:cyan">******************************************</h1>
            <h1 style="color:cyan">ERROR !!</h1>
            <h1 style="color:cyan">tu ID se repite en la BDs !!</h1>
            <h1 style="color:cyan">******************************************</h1>`);
        }
        else {
                 res.write('<meta charset="UTF-8">');
                 res.write(`*********************************************************************
            <body style="background:darkcyan"></body>`);
            res.write(`<h1 style="color:cyan">EL REGISTRO FUE EXITOSO !!</h1>
            *********************************************************************`);
            res.write(`<h1 style="color:cyan">Datos recibidos</h1>
            *********************************************************************`); 
            res.write('<ul style="color:cyan">');
            for(var key in data){
                 if(Object.prototype.hasOwnProperty.call(data, key)){
                        res.write( `<li>${key.toString().toUpperCase()} : ${data[key]}</li>`);
                        } 
                    }
                    res.write(`<h1 style="color:cyan">
            *********************************************************************</h1>`); 
             }
           res.write(`<input 
                type="button" 
                onclick=" location.href='index.html' "
                value="Regresar" 
                name="boton"
                class="btn btn-primary" /></h1>`); 
            res.write('<ul style="color:cyan">');
// registra el documento insertado originalmente
        console.log(JSON.stringify(data))
        db.close()
      })
    })
            //cierro la ul y la conexion
            res.write('</ul>');   
        });
    }else{
        //se sirve el index.html
        console.log(">se solicita la raiz con Get".red);
        staticServer.serve(req,res);
    }  
}
var getfind = function (req, res) {

    mongo.connect(url, function (err, db) {
        if (err) {
            return console.error(err)
        }
        //accedo a la coleccion con parrots 
        db.collection('inquilinos').find({}).toArray(
            function (err, documents) {
                if (err) return console.error(err);
                if (documents.length == 0){
                  res.write(`<body style="background: darkcyan">
                  <h1 style="color:cyan">****************************************</h1>
                  <h1  style="color:cyan"> ERROR !!</h1>
                  <h1 style="color:cyan">No cuenta con ningun registro !!</h1></h1>
                  <h1 style="color:cyan">****************************************</h1>`);
                  res.write(`<input 
                type="button" 
                onclick=" location.href='index.html' "
                value="Regresar" 
                name="boton"
                class="btn btn-primary" /></h1>`); 
                }     
                else {
                    res.write('<P ALIGN=CENTER><body style="background: darkcyan">');
                     res.write(`<h1 ALIGN=CENTER style="color:cyan">****************************************</h1>
                  <h1 ALIGN=CENTER style="color:cyan">LISTA DE ARTICULOS REGISTRADOS</h1></h1>
                  <h1 ALIGN=CENTER style="color:cyan">****************************************</h1>`);
                    res.write('<P ALIGN=CENTER><table border="1" style="color:cyan"><thead><tr><th>ID</th><th>Articulo</th><th>Marca</th><th>Unidades</th></tr></thead>');
                    for (i = 0; i < documents.length; i++) {
                        //var a = documents[i]._id, b = documents[i].Nombre, c=documents[i].Apellido,d=documents[i].Depto;
                        res.write('<tr><td>' + documents[i]._id + '</td>' +
                            '<td>' + documents[i].articulo + '</td>' +
                            '<td>' + documents[i].marca + '</td>' +
                            '<td>' + documents[i].unidades + '</td></tr>')
                    }
                    res.write(`<input 
                type="button" 
                onclick=" location.href='index.html' "
                value="Regresar" 
                name="boton"
                class="btn btn-primary" /></h1>`); 
                /* res.write(`<input 
                type="button" 
                onclick=" location.href='http://127.0.0.1:3000/update' "
                value="Actualizar" 
                name="boton"
                class="btn btn-primary" /></h1>`);*/
                
                   res.write('</p>')  
                }
                res.end();
                db.close()
            })      
    })
}
var update= function (req, res) {
    mongo.connect(url, function (err, db) {
        if (err) {
            return console.error(err)
        }
  res.write('<body style="background: darkcyan">');
  res.write(`<form> <div class="form-group"><label 
                    for="inputPassword"
                    class="control-label col-xs-2">
                    Password :
                </label>
                <div class="col-xs-5">
                    <input 
                    required
                    class="form-control"
                    type="_id"
                    name="_id"
                    id="inputPassword"
                    placeholder="Ingrese Password"
                    maxlength="8">
                </div>
            </div></fomr>`);
            
             res.write(`<form> <div class="form-group"><label 
                    for="inputNombre"
                    class="control-label col-xs-2">
                   Nombre que se Actualizara   :
                </label>
                <div class="col-xs-5">
                    <input 
                    required
                    class="form-control"
                    type="text"
                    name="nombre"
                    id="inputNombre"
                    placeholder="Nombre">
                </div>
            </div></fomr>`);
            
        var first = documents._id
        var second = docuemnts.nombre
        var collection = db.collection('inquilinos')
            collection.update({
                username :firts

            },{
                $set:{
                    Nombre: second
                }
            },function(err,data)
            {
                if(err)return console.error(err)
                db.close()
            })
            
    })  

}


//exportando Manejadores
var handlers ={};
handlers["/"]=getPostRoot;
handlers ["/getauthorinfo"] = getAuthorInfo;
handlers["/getservername"] = getServerName;
handlers["/getservertime"] = getServerTime;
handlers["/getfind"] = getfind;
handlers["/update"] = update;
module.exports = handlers;