// PARTE 11
// Eventos + API + async/await.
// Distintos eventos (click, change, submit, keydown) disparan
// peticiones fetch hacia APIs externas.

document.addEventListener("DOMContentLoaded", function () {
  const mensajeInicio = document.getElementById("mensajeInicio");
  mensajeInicio.textContent = "Aplicación lista. Interactúe con los controles.";
  mensajeInicio.className = "alert alert-success";

  configurarBotonGato();
  configurarBotonPerro();
  configurarSelectorApi();
  configurarFormularioUsuario();
  configurarKeydown();
});

// 1. Click: trae una curiosidad de gato.
function configurarBotonGato() {
  const btnGato = document.getElementById("btnGato");
  const resultadoGato = document.getElementById("resultadoGato");

  btnGato.addEventListener("click", async function () {
    resultadoGato.textContent = "Cargando curiosidad...";

    const respuesta = await fetch("https://catfact.ninja/fact");
    const datos = await respuesta.json();

    resultadoGato.textContent = datos.fact;
  });
}

// 2. Click: trae una imagen aleatoria de perro.
function configurarBotonPerro() {
  const btnPerro = document.getElementById("btnPerro");
  const imagenPerro = document.getElementById("imagenPerro");

  btnPerro.addEventListener("click", async function () {
    const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
    const datos = await respuesta.json();

    imagenPerro.src = datos.message;
  });
}

// 3. Change: según la opción elegida, consulta una API distinta.
function configurarSelectorApi() {
  const selectorApi = document.getElementById("selectorApi");
  const resultadoSelector = document.getElementById("resultadoSelector");

  selectorApi.addEventListener("change", async function () {
    const opcion = selectorApi.value;

    if (opcion === "gato") {
      resultadoSelector.textContent = "Consultando Cat Fact...";
      const respuesta = await fetch("https://catfact.ninja/fact");
      const datos = await respuesta.json();
      resultadoSelector.textContent = datos.fact;
    } else if (opcion === "perro") {
      resultadoSelector.textContent = "Consultando Dog API...";
      const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
      const datos = await respuesta.json();
      resultadoSelector.textContent = "Imagen obtenida: " + datos.message;
    } else {
      resultadoSelector.textContent = "Seleccione una opción.";
    }
  });
}

// 4. Submit: busca un usuario por id en JSONPlaceholder.
function configurarFormularioUsuario() {
  const formBuscarUsuario = document.getElementById("formBuscarUsuario");
  const idUsuario = document.getElementById("idUsuario");
  const resultadoUsuario = document.getElementById("resultadoUsuario");
  const nombreUsuario = document.getElementById("nombreUsuario");
  const correoUsuario = document.getElementById("correoUsuario");
  const ciudadUsuario = document.getElementById("ciudadUsuario");

  formBuscarUsuario.addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = idUsuario.value;
    if (!id || id < 1 || id > 10) {
      alert("Escriba un id de usuario entre 1 y 10.");
      return;
    }

    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
    const datos = await respuesta.json();

    nombreUsuario.textContent = datos.name;
    correoUsuario.textContent = "Correo: " + datos.email;
    ciudadUsuario.textContent = "Ciudad: " + datos.address.city;

    resultadoUsuario.classList.remove("d-none");
  });
}

// 5. Keydown: muestra la última tecla presionada mientras se escribe.
function configurarKeydown() {
  const textoPrueba = document.getElementById("textoPrueba");
  const estadoEscritura = document.getElementById("estadoEscritura");

  textoPrueba.addEventListener("keydown", function (event) {
    estadoEscritura.textContent = "Última tecla presionada: " + event.key;
  });
}
