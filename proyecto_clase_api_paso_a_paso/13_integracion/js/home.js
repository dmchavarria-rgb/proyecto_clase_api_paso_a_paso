// ============================================================
// CARPETA 13 - PANEL PRINCIPAL
// Archivo para estudiantes
// Complete la lógica de cada sección siguiendo los comentarios.
// ============================================================

// ------------------------------
// 1. API utilizadas
// ------------------------------
const API_PAISES = "https://countries.dev/countries";
const API_CLIMA = "https://api.open-meteo.com/v1/forecast";

// ------------------------------
// 2. Elementos principales del DOM
// ------------------------------
const nombreSesion = document.getElementById("nombreSesion");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

const kpiPaises = document.getElementById("kpiPaises");
const kpiUltimoPais = document.getElementById("kpiUltimoPais");
const kpiCiudad = document.getElementById("kpiCiudad");
const kpiTemperatura = document.getElementById("kpiTemperatura");

const selectPais = document.getElementById("selectPais");
const btnGuardarPais = document.getElementById("btnGuardarPais");
const resultadoPais = document.getElementById("resultadoPais");

const selectCiudad = document.getElementById("selectCiudad");
const btnConsultarClima = document.getElementById("btnConsultarClima");
const resultadoClima = document.getElementById("resultadoClima");

const campoMensaje = document.getElementById("campoMensaje");
const estadoMensaje = document.getElementById("estadoMensaje");

const btnSweet = document.getElementById("btnSweet");
const btnToast = document.getElementById("btnToast");

const btnActualizarGrafico = document.getElementById("btnActualizarGrafico");
const datosSession = document.getElementById("datosSession");
const datosLocal = document.getElementById("datosLocal");
const btnGuardarLocal = document.getElementById("btnGuardarLocal");
const btnLimpiarLocal = document.getElementById("btnLimpiarLocal");
const btnVerStorage = document.getElementById("btnVerStorage");

// ------------------------------
// 3. Variables globales simples
// ------------------------------
let paises = [];
let temporizador;
let graficoPractica;

// ------------------------------
// 4. Evento inicial
// ------------------------------
document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
  // Muestre el nombre guardado en sessionStorage.
  const usuario = sessionStorage.getItem("usuarioActual");
  if (usuario) {
    nombreSesion.textContent = "Usuario: " + usuario;
  } else {
    window.location.href = "index.html";
  }
  
  // Cargue los países en el select.
  cargarPaises();
  
  // Dibuje el gráfico inicial.
  crearGrafico();
  
  // Actualice la información de storage.
  actualizarStorageEnPantalla();
  actualizarKpis();
}

// ------------------------------
// 5. Eventos de botones y campos
// ------------------------------
btnCerrarSesion.addEventListener("click", function() {
  // Limpie sessionStorage y regrese al login.
  sessionStorage.removeItem("usuarioActual");
  mostrarToast("Sesion cerrada");
  setTimeout(function() {
    window.location.href = "index.html";
  }, 1000);
});

btnGuardarPais.addEventListener("click", function() {
  // Guarde la nacionalidad seleccionada en localStorage.
  const paisSeleccionado = selectPais.value;
  if (paisSeleccionado) {
    localStorage.setItem("nacionalidad", paisSeleccionado);
    mostrarPaisSeleccionado();
    actualizarKpis();
    actualizarStorageEnPantalla();
    mostrarToast("Pais guardado: " + paisSeleccionado);
  }
});

btnConsultarClima.addEventListener("click", function() {
  // Consulte el clima de la ciudad seleccionada.
  consultarClima();
});

campoMensaje.addEventListener("input", function() {
  // Muestre "Escribiendo...".
  estadoMensaje.textContent = "Escribiendo...";
  
  // Use clearTimeout y setTimeout para borrar el mensaje después de 1 segundo.
  if (temporizador) {
    clearTimeout(temporizador);
  }
  
  temporizador = setTimeout(function() {
    estadoMensaje.textContent = "";
  }, 1000);
});

btnSweet.addEventListener("click", function() {
  // Muestre una confirmación con SweetAlert2.
  Swal.fire({
    title: 'Confirmacion',
    text: "Esta es una demostracion",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  });
});

btnToast.addEventListener("click", function() {
  // Muestre una notificación con Toastify.
  mostrarToast("Notificacion de prueba");
});

btnActualizarGrafico.addEventListener("click", function() {
  // Genere números aleatorios y actualice el gráfico.
  actualizarGraficoAleatorio();
});

btnGuardarLocal.addEventListener("click", function() {
  // Guarde un dato de prueba en localStorage.
  const dato = {
    fecha: new Date().toLocaleString(),
    valor: Math.floor(Math.random() * 100)
  };
  localStorage.setItem("datoPrueba", JSON.stringify(dato));
  actualizarStorageEnPantalla();
  mostrarToast("Dato guardado en localStorage");
});

btnLimpiarLocal.addEventListener("click", function() {
  // Limpie localStorage y actualice la vista.
  localStorage.clear();
  actualizarStorageEnPantalla();
  actualizarKpis();
  mostrarToast("LocalStorage limpiado");
});

btnVerStorage.addEventListener("click", function() {
  // Actualice la vista de sessionStorage y localStorage.
  actualizarStorageEnPantalla();
  mostrarToast("Storage actualizado");
});

// ------------------------------
// 6. Funciones pendientes
// ------------------------------
async function cargarPaises() {
  try {
    const respuesta = await fetch(API_PAISES);
    const datos = await respuesta.json();
    paises = datos;
    
    // Limpiar el select
    selectPais.innerHTML = '<option value="">Seleccione un país...</option>';
    
    // Recorrer y agregar cada país con su bandera
    for(let i = 0; i < paises.length; i++) {
      const option = document.createElement("option");
      // La API devuelve "name" como string simple (no como objeto)
      option.value = paises[i].name;
      
      // Obtener la bandera - la API tiene "flag" con el emoji directamente
      const flag = paises[i].flag || '🏳️';
      
      // Mostrar bandera + nombre del país
      option.textContent = flag + ' ' + paises[i].name;
      selectPais.appendChild(option);
    }
    
    console.log('Países cargados:', paises.length);
    
  } catch(error) {
    console.error("Error cargando países:", error);
    selectPais.innerHTML = '<option value="">Error al cargar países</option>';
  }
}

function mostrarPaisSeleccionado() {
  const nombrePais = selectPais.value;
  if (!nombrePais) {
    resultadoPais.innerHTML = "Seleccione un país";
    return;
  }
  
  let pais = null;
  for(let i = 0; i < paises.length; i++) {
    if(paises[i].name === nombrePais) {
      pais = paises[i];
      break;
    }
  }
  
  if(pais) {
    const bandera = pais.flag || '🏳️';
    const capital = pais.capital || "No disponible";
    const region = pais.region || "No disponible";
    const poblacion = pais.population ? pais.population.toLocaleString() : "No disponible";
    
    resultadoPais.innerHTML = 
      "<strong>Bandera:</strong> " + bandera + "<br>" +
      "<strong>País:</strong> " + pais.name + "<br>" +
      "<strong>Capital:</strong> " + capital + "<br>" +
      "<strong>Región:</strong> " + region + "<br>" +
      "<strong>Población:</strong> " + poblacion;
  }
}

async function consultarClima() {
  // Separe el value del selectCiudad con split(",").
  const valor = selectCiudad.value;
  if (!valor) {
    resultadoClima.innerHTML = "Seleccione una ciudad";
    return;
  }
  
  const partes = valor.split(",");
  const ciudad = partes[0];
  const lat = partes[1];
  const lng = partes[2];
  
  if (!lat || !lng) {
    resultadoClima.innerHTML = "Datos de ubicacion no disponibles";
    return;
  }
  
  try {
    // Arme la URL con latitud y longitud.
    const url = API_CLIMA + "?latitude=" + lat + "&longitude=" + lng + 
                "&current_weather=true&timezone=auto";
    
    // Consulte la API de clima.
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    
    // Muestre temperatura, humedad y viento.
    const temp = datos.current_weather?.temperature || "No disponible";
    const viento = datos.current_weather?.windspeed || "No disponible";
    
    resultadoClima.innerHTML = 
      "<strong>Ciudad:</strong> " + ciudad + "<br>" +
      "<strong>Temperatura:</strong> " + temp + "°C<br>" +
      "<strong>Viento:</strong> " + viento + " km/h";
    
    // Guarde ciudad y temperatura en localStorage.
    localStorage.setItem("ultimaCiudad", ciudad);
    localStorage.setItem("ultimaTemperatura", temp + "°C");
    actualizarKpis();
    
  } catch(error) {
    console.error("Error consultando clima:", error);
    resultadoClima.innerHTML = "Error al consultar el clima";
  }
}

function crearGrafico() {
  // Cree un gráfico de barras con Chart.js.
  const ctx = document.getElementById('graficoPractica').getContext('2d');
  
  graficoPractica = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Datos',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function actualizarGraficoAleatorio() {
  // Cambie los datos del gráfico usando Math.random().
  if (graficoPractica) {
    const nuevosDatos = [];
    for (let i = 0; i < 6; i++) {
      nuevosDatos.push(Math.floor(Math.random() * 50) + 5);
    }
    graficoPractica.data.datasets[0].data = nuevosDatos;
    graficoPractica.update();
    mostrarToast("Grafico actualizado");
  }
}

function actualizarStorageEnPantalla() {
  // Session Storage - Mostrar como lista simple
  let sessionHTML = "";
  if (sessionStorage.length === 0) {
    sessionHTML = "<div>No hay datos en sessionStorage</div>";
  } else {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      sessionHTML += `<div><strong>${key}:</strong> ${value}</div>`;
    }
  }
  datosSession.innerHTML = sessionHTML;
  
  // Local Storage - Mostrar como lista simple
  let localHTML = "";
  if (localStorage.length === 0) {
    localHTML = "<div>No hay datos en localStorage</div>";
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      localHTML += `<div><strong>${key}:</strong> ${value}</div>`;
    }
  }
  datosLocal.innerHTML = localHTML;
}
function actualizarKpis() {
  // Actualice las tarjetas superiores usando datos de localStorage.
  kpiPaises.textContent = paises.length || 0;
  kpiUltimoPais.textContent = localStorage.getItem("nacionalidad") || "No seleccionado";
  kpiCiudad.textContent = localStorage.getItem("ultimaCiudad") || "No disponible";
  kpiTemperatura.textContent = localStorage.getItem("ultimaTemperatura") || "No disponible";
}

function mostrarToast(mensaje) {
  // Muestre un mensaje breve con Toastify.
  Toastify({
    text: mensaje,
    duration: 2000,
    gravity: "top",
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b894, #00cec9)",
      borderRadius: "10px"
    }
  }).showToast();
}