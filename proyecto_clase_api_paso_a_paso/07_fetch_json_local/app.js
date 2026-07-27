// PASO 7
// Rquiere Live Server. No abrir con doble clic.

const boton = document.getElementById("btnCargar");
boton.addEventListener("dblclick", cargar);
const resultado = document.getElementById("resultado");

async function cargar(){
    const respuesta = await fetch("./data/academico.json");
    const datos = await respuesta.json();

    console.log(datos);

    const institucion = datos.institucion.nombre;
    const estudiantes = datos.institucion.estudiantes

    resultado.innerHTML = `<h2>${institucion}</h2>
    <p>Estudiantes: ${estudiantes.length}</p>
    <p>Primer estudiante: ${estudiantes[0].nombre}</p>`
}