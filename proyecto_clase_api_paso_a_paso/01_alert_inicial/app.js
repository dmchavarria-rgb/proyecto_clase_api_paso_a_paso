// PASO 1
// JavaScript puede ejecutarse cuando la página ya cargó.

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

function iniciarAplicacion(){
    //alert("HOLA MUNDO")
    const resultado = document.getElementById("resultado");
    resultado.textContent = "Holis amigos";
}