function validaf(){

var nom = document.getElementById("nombre").value;
var ap = document.getElementById("apellido").value;
var correo = document.getElementById("correo").value;
var user = document.getElementById("usuario").value;
var clave = document.getElementById("clave").value;
var tel = document.getElementById("telefono").value;

if(nom === ""){
alert("Falta ingresar el nombre");
return false;
}

if(ap === ""){
alert("Falta ingresar los apellidos");
return false;
}

if(correo === ""){
alert("Falta ingresar el correo");
return false;
}

var expresion = /\w+@\w+\.[a-z]/;

if(!expresion.test(correo)){
alert("El correo es invalido");
return false;
}

if(user === ""){
alert("Falta ingresar el usuario");
return false;
}

if(clave === ""){
alert("Falta ingresar la contraseña");
return false;
}

if(tel === ""){
alert("Falta ingresar el telefono");
return false;
}

if(isNaN(tel)){
alert("Solo numeros en el telefono");
return false;
}

if(tel.length != 10){
alert("El telefono debe tener 10 digitos");
return false;
}

var hombre = document.getElementById("sexh").checked;
var mujer = document.getElementById("sexm").checked;

if(hombre == false && mujer == false){
alert("Debes seleccionar un genero");
return false;
}

var terminos = document.getElementById("tercon").checked;

if(terminos == false){
alert("Debes aceptar los terminos");
return false;
}

/* CREAR JUGADOR */

var jugador = {

usuario:user,
clave:clave,
nombre:nom,
nivel:1,
xp:0,
vida:100,
clase:"Estudiante"

};

localStorage.setItem("jugador", JSON.stringify(jugador));

alert("Cuenta creada correctamente");

return true;

}

function limpiar(){

document.getElementById("nombre").value="";
document.getElementById("apellido").value="";
document.getElementById("correo").value="";
document.getElementById("usuario").value="";
document.getElementById("clave").value="";
document.getElementById("telefono").value="";

document.getElementById("sexh").checked=false;
document.getElementById("sexm").checked=false;
document.getElementById("tercon").checked=false;

}