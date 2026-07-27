// PASO 2
// El usuario hace clic y JavaScript responde.

const btnMostrar = document.getElementById("btnMostrar");

btnMostrar.addEventListener("click", accion);

function accion(){
    const resultado = document.getElementById("resultado");
    resultado.textContent = "YAAAAAA";
    alert("Holaaaaa")
}