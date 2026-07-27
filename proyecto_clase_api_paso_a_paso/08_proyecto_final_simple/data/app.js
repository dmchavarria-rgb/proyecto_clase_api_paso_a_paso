// PASO 8
// Proyecto final simple. 
document.addEventListener('DOMContentLoaded', iniciarAplicacion);
let datosAcademicos = null;

const btnImagen = document.getElementById("btnOtraImagen");
const btnPromedio = document.getElementById("btnPromedio");
const btnDato = document.getElementById("btnDato");
const resultadoPromedio = document.getElementById("resultadoPromedio");
const resultadoDato = document.getElementById("resultadoDato");

function iniciarAplicacion(){
    generarImagen();
    cargarJSONAcademico();
    btnImagen.addEventListener("click", generarImagen);
    btnPromedio.addEventListener("click", calcularPromedio);
    btnDato.addEventListener("click", generarDato);
}

async function generarImagen(){
    const estado = document.getElementById("estadoImagen");
    const imagen = document.getElementById("imagenPerro");
    estado.textContent = "Cargando imagen..1";

    const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
    const datos = await respuesta.json();

    imagen.src = datos.message;
}

async function cargarJSONAcademico(){
    const respuesta = await fetch("data/academico.json")
    datosAcademicos = await respuesta.json();
    console.log(datosAcademicos);
}

function calcularPromedio(){
    if(datosAcademicos === null){
        console.error("No hay datos académicos disponibles.")
        alert("No hay datos académicos", "danger")
        return;
    }

    const estudiantes = datosAcademicos.institucion.estudiantes;
    const luis = estudiantes[1];
    const notas = luis.materias[0].notas;

    let suma = 0;
    for(const nota of notas){
        suma += nota
    }

    const promedio = suma / notas.length;
    resultadoPromedio.textContent = "El promedio de Luis Mora es "+promedio
}

async function generarDato(){
    const dato = await fetch("https://catfact.ninja/fact");
    const mensaje = await dato.json();

    resultadoDato.textContent = mensaje.fact;
}
