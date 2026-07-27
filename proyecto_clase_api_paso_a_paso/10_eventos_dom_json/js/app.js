// PARTE 10
// Eventos + DOM + JSON embebido.
// Se muestra, busca, filtra y calcula el promedio de estudiantes
// guardados en un arreglo de objetos (JSON embebido en JavaScript).

// Arreglo de estudiantes (JSON embebido).
let estudiantes = [
  { nombre: "Ana Torres", carrera: "Tecnologías de la Información", notas: [18, 17, 19] },
  { nombre: "Luis Mora", carrera: "Software", notas: [14, 13, 15] },
  { nombre: "María Salazar", carrera: "Sistemas", notas: [16, 15, 20] },
  { nombre: "Carlos Pinto", carrera: "Tecnologías de la Información", notas: [12, 14, 13] }
];

// Referencias al DOM.
const btnMostrar = document.getElementById("btnMostrar");
const btnPromedios = document.getElementById("btnPromedios");
const btnLimpiar = document.getElementById("btnLimpiar");
const buscador = document.getElementById("buscador");
const filtroCarrera = document.getElementById("filtroCarrera");
const formEstudiante = document.getElementById("formEstudiante");
const nuevoNombre = document.getElementById("nuevoNombre");
const nuevaCarrera = document.getElementById("nuevaCarrera");
const nuevaNota = document.getElementById("nuevaNota");
const mensaje = document.getElementById("mensaje");
const cuerpoTabla = document.getElementById("cuerpoTabla");

// Bandera para saber si ya se deben mostrar los promedios en la tabla.
let mostrarPromedio = false;

// Evento click: muestra todos los estudiantes.
btnMostrar.addEventListener("click", function () {
  mostrarPromedio = false;
  mensaje.textContent = "Mostrando " + estudiantes.length + " estudiante(s).";
  pintarTabla(estudiantes);
});

// Evento click: calcula y muestra los promedios.
btnPromedios.addEventListener("click", function () {
  mostrarPromedio = true;
  mensaje.textContent = "Mostrando promedios calculados.";
  pintarTabla(estudiantes);
});

// Evento click: limpia la tabla.
btnLimpiar.addEventListener("click", function () {
  cuerpoTabla.innerHTML = "";
  mensaje.textContent = "Tabla limpiada.";
});

// Evento input: busca coincidencias mientras se escribe.
buscador.addEventListener("input", function () {
  const texto = buscador.value.toLowerCase();
  const filtrados = estudiantes.filter(function (est) {
    return est.nombre.toLowerCase().includes(texto);
  });
  mensaje.textContent = "Resultados de búsqueda: " + filtrados.length;
  pintarTabla(filtrados);
});

// Evento change: filtra por carrera seleccionada.
filtroCarrera.addEventListener("change", function () {
  const carrera = filtroCarrera.value;
  const filtrados = carrera
    ? estudiantes.filter(function (est) { return est.carrera === carrera; })
    : estudiantes;

  mensaje.textContent = carrera
    ? "Mostrando carrera: " + carrera
    : "Mostrando todas las carreras.";
  pintarTabla(filtrados);
});

// Evento submit: agrega un nuevo estudiante al arreglo.
formEstudiante.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = nuevoNombre.value.trim();
  const carrera = nuevaCarrera.value;
  const nota = Number(nuevaNota.value);

  if (nombre === "" || carrera === "" || nuevaNota.value === "") {
    mensaje.textContent = "Complete todos los campos para agregar un estudiante.";
    return;
  }

  estudiantes.push({ nombre: nombre, carrera: carrera, notas: [nota] });

  mensaje.textContent = "Estudiante agregado: " + nombre;
  pintarTabla(estudiantes);

  formEstudiante.reset();
});

// Calcula el promedio de un arreglo de notas.
function calcularPromedio(notas) {
  let suma = 0;
  for (const nota of notas) {
    suma += nota;
  }
  return (suma / notas.length).toFixed(2);
}

// Dibuja las filas de la tabla a partir de un arreglo de estudiantes.
function pintarTabla(lista) {
  cuerpoTabla.innerHTML = "";

  lista.forEach(function (est, indice) {
    const fila = document.createElement("tr");
    const promedio = calcularPromedio(est.notas);

    fila.innerHTML = `
      <td>${indice + 1}</td>
      <td>${est.nombre}</td>
      <td>${est.carrera}</td>
      <td>${est.notas.join(", ")}</td>
      <td class="${promedio >= 17 ? "nota-alta" : ""}">${mostrarPromedio ? promedio : "-"}</td>
    `;

    cuerpoTabla.appendChild(fila);
  });
}
