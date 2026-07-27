// PASO 3
// Objeto tipo JSON dentro del JS.

const estudiante = {
    nombre: "Anahi",
    apellido: "Correa Delgado",
    carrera: "ITIN",
    semestre: 4,
    edad: 20,
    materias: ["programacion", "base de datos", "redes", "Sistemas Operativos"],
    notas: [19, 18, 16, 17]
};

const resultado = document.getElementById("resultado")
const boton = document.getElementById("btnMostrar");
boton.addEventListener("click", mostrar)

function mostrar(){
    resultado.innerHTML = `
        <p><strong>Nombre:</strong> ${estudiante.nombre} ${estudiante.apellido}</p>

    `;
} 