// PASO 5
// Fetch, primero se pide la información, luego se convierte a JSON.

const boton = document.getElementById("btnCargar");
const resultado = document.getElementById("resultado");
boton.addEventListener("click", consultar)

async function consultar(){
    resultado.innerHTML = "Cargando...";

    const respuesta = await fetch("https://catfact.ninja/fact")
    const datos = await respuesta.json();
    console.log(datos)

    resultado.textContent = datos.fact;
}