// PASO 6
// La función se ejecuta sola cuando la página carga.
// También se reutiliza la misma función con el botón.
// Foto de perfil: https://dog.ceo/api/breeds/image/random

const boton = document.getElementById("btnRecargar");
boton.addEventListener("click", generarImagen);

document.addEventListener("DOMContentLoaded", generarImagen);

async function generarImagen(){
    const estado = document.getElementById("estado");
    const imagen = document.getElementById("imagenPerro");

    estado.textContent = "Cargando imagen Perro desde la API..."
    const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");

    const datos = await respuesta.json();

    console.log(datos);

    imagen.src = datos.message;

    estado.textContent = "Imagen cargada correctamente"
}