// PASO 4
// JSON más anidado. Rutas largas y cálculo sencillo.

const datos = {
  institucion: {
    nombre: "Universidad de práctica",
    estudiantes: [
      {
        nombre: "Ana Torres",
        materias: [
          {
            nombre: "Aplicaciones Web",
            notas: [18, 17, 19]
          }
        ]
      },
      {
        nombre: "Luis Mora",
        materias: [
          {
            nombre: "Aplicaciones Web",
            notas: [14, 13, 15]
          }
        ]
      }
    ]
  }
};

const boton = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");
boton.addEventListener("click", calcular);

function calcular(){
  let suma = 0;
  let datosEstudiante = datos.institucion.estudiantes[1].materias[0].notas;
  
  for(const dato of datosEstudiante){
    suma = dato + suma
  }
  let promedio = suma / datosEstudiante.length;

  resultado.textContent = `Promedio: ${promedio}`
}

