# Parte 12: Productos desde DummyJSON

Esta carpeta contiene una práctica sencilla para consumir la API:

https://dummyjson.com/products

## Objetivo

Consumir una API externa con `fetch`, convertir la respuesta a JSON, acceder al arreglo `products` y recorrerlo para crear tarjetas visuales con imagen, nombre, categoría, descripción, precio, stock y calificación.

## Orden para explicar en clase

1. Abrir `index.html` con Live Server.
2. Mostrar que el contenedor de productos está vacío.
3. Explicar el botón `Cargar productos`.
4. En `app.js`, explicar `getElementById`.
5. Explicar `addEventListener("click", cargarProductos)`.
6. Explicar por qué `cargarProductos` es `async`.
7. Explicar `fetch("https://dummyjson.com/products")`.
8. Explicar `await respuesta.json()`.
9. Explicar que `datos.products` es el arreglo de productos.
10. Recorrer el arreglo con `for...of`.
11. Crear una tarjeta por cada producto.
12. Mostrar las tarjetas en pantalla con `appendChild`.

## Archivos

- `index.html`: estructura visual.
- `css/style.css`: estilos simples.
- `js/app.js`: lógica JavaScript comentada.
