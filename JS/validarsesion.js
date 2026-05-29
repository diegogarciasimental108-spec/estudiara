function validarsesion() {

var user = document.getElementById("usuario").value;
var clave = document.getElementById("clave").value;

if (user === "") {
alert("Falta ingresar el usuario");
return false;
}

if (clave === "") {
alert("Falta ingresar la clave");
return false;
}

var terminos = document.getElementById("tercon").checked;

if (terminos == false) {
alert("Debes aceptar los terminos y condiciones");
return false;
}

var datos = JSON.parse(localStorage.getItem("jugador"));



}

function limpiar(){

document.getElementById("usuario").value="";
document.getElementById("clave").value="";
document.getElementById("tercon").checked=false;

}