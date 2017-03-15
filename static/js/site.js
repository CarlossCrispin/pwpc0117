//este script sera ejecutado 
//por un cliente (navegador)
function saludar(){
    //a)alert("Bienvenido a mi sitio");
    //b)sweetAlert("Huuuuuy...","Algo salio mal","error");
    //c)sweetAlert("Muy Bien !!","Tu server funciona :D","href");
    swal({
        title:"Exito",
        text:"Servidor Funcionando",
        imageUrl:"../img/sab.jpg"
    });
}
