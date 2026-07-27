// ============================================================
// CARPETA 13 - LOGIN SIMULADO
// Archivo para estudiantes
// Complete la lógica siguiendo el orden de los comentarios.
// ============================================================

// 1. Seleccione el formulario con getElementById.
const formLogin = document.getElementById("formLogin");

// 2. Seleccione el input del nombre.
const nombreUsuario = document.getElementById("nombreUsuario");

// 3. Seleccione el input de la contraseña.
const claveUsuario = document.getElementById("claveUsuario");

// 4. Seleccione el texto donde aparecerá "Escribiendo...".
const estadoEscritura = document.getElementById("estadoEscritura");

// 5. Seleccione el botón para generar un número aleatorio.
const btnCodigo = document.getElementById("btnCodigo");

// 6. Seleccione el contenedor donde se mostrará el código aleatorio.
const resultadoCodigo = document.getElementById("resultadoCodigo");

// 7. Cree una variable llamada temporizador.
// Esta variable servirá para controlar el tiempo de espera.
let temporizador;

// 8. Agregue el evento input al campo nombreUsuario.
// Cada vez que el usuario escriba, debe aparecer "Escribiendo...".
// Después de 1 segundo, el mensaje debe limpiarse.
nombreUsuario.addEventListener("input", function() {
  // Escriba aquí la lógica del temporizador.
  estadoEscritura.textContent = "Escribiendo...";

  if(temporizador){
    clearTimeout(temporizador);
  }

  temporizador = setTimeout(function(){
    estadoEscritura.textContent = ""
  }, 1000);
});

// 9. Agregue el evento click al botón btnCodigo.
// Genere un número aleatorio entre 1000 y 9999 y muéstrelo en pantalla.
btnCodigo.addEventListener("click", function() {
  // Escriba aquí la lógica de Math.random().
  const codigo = Math.floor(Math.random() * 9000) + 1000;
  resultadoCodigo.textContent = `Código generado: ${codigo}`;
});

// 10. Agregue el evento submit al formulario.
// Evite la recarga de la página con event.preventDefault().
// Valide que el nombre y la contraseña no estén vacíos.
// Guarde el nombre en sessionStorage.
// Guarde el último usuario en localStorage.
// Muestre una notificación con Toastify.
// Redirija a home.html.
formLogin.addEventListener("submit", function(event) {
  // Escriba aquí la lógica del login simulado.
  event.preventDefault();

  if(nombreUsuario.value.trim() === "" || claveUsuario.value.trim() === ""){
    Toastify({
      text: "Por favor llene los campos",
      duration: 3000,
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #ff6b6b, #ee5a24)",
        borderRadius: "10px"
      }
  
    }).showToast();
    return;
  }

  sessionStorage.setItem("usuarioActual", nombreUsuario.value)
  localStorage.setItem("ultimoUsuario", nombreUsuario.value)

  window.location.href = "home.html";

});
