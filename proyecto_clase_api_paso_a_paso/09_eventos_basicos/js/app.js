document.addEventListener("DOMContentLoaded", function(){
    const mensajeInicio = document.getElementById("mensajeInicio");
    mensajeInicio.textContent = "La página ya está cargada";

    mensajeInicio.className = "alert alert-success";

    configurarEventosClick();
    configurarEventosMouse();
    configurarEventoInput();
    configurarEventoChange();
    configurarEventoKeydown();
    configurarEventoSubmit();
});

function configurarEventosClick(){
    const btnClick = document.getElementById("btnClick");
    const btnDobleClick = document.getElementById("btnDobleClick");
    const resultadoClick = document.getElementById("resultadoClick");
    
    btnClick.addEventListener("click", function(){
        resultadoClick.textContent = "El usuario dio 1 click"
    });

    btnDobleClick.addEventListener("dblclick", function(){
        resultadoClick.textContent = "El usuario dió 2 clicks"
    });
}

function configurarEventosMouse(){
    const tarjetaMouse = document.getElementById("tarjetaMouse");

    tarjetaMouse.addEventListener("mouseover",function(){
        tarjetaMouse.textContent = "El mouse essta sobre la caja";
        tarjetaMouse.classList.add("activa");
    })

    tarjetaMouse.addEventListener("mouseout", function(){
        tarjetaMouse.textContent = "Pase el mouse sobre esta caja";
        tarjetaMouse.classList.remove("activa");
    })
}

function configurarEventoInput(){
    const nombre = document.getElementById("nombre");
    const textoEscrito = document.getElementById("textoEscrito");

    nombre.addEventListener("input", function(){
        textoEscrito.textContent = nombre.value;
    })
}

function configurarEventoChange(){
    const carrera = document.getElementById("carrera");
    const carreraSeleccionada = document.getElementById("carreraSeleccionada");

    carrera.addEventListener("change", function(){
        carreraSeleccionada.textContent = carrera.value;
    })
}

function configurarEventoKeydown(){
    const buscador = document.getElementById("buscador");
    const teclaPresionada = document.getElementById("teclaPresionada");

    buscador.addEventListener("keydown", function(event){
        teclaPresionada.textContent = event.key;

        if(event.key === "Enter"){
            alert("Usted presiono Enter y su texto escrito es:", buscador.value)
        }
    })
}

function configurarEventoSubmit(){
    const formularioDemo = document.getElementById("formularioDemo");
    const correo = document.getElementById("correo");
    const resultadoFormulario = document.getElementById("resultadoFormulario");

    formularioDemo.addEventListener("submit", function(event){
        event.preventDefault();

        resultadoFormulario.textContent = "Formulario capturado con javaScript. Correo: " + correo.value;

    })
}