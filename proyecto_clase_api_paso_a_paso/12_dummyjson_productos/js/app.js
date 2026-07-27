const btnCargarProductos = document.getElementById("btnCargarProductos");
const contenedorProductos = document.getElementById("contenedorProductos");
const estadoCarga = document.getElementById("estadoCarga");

btnCargarProductos.addEventListener("click", cargarProductos);

async function cargarProductos(){
    estadoCarga.textContent = "Cargando productos desde la API...";
    contenedorProductos.innerHTML = "";

    try{
        const respuesta = await fetch("https://dummyjson.com/products");

        if(!respuesta.ok){
            throw new Error("No se obtuvo la información")
        }

        const datos = await respuesta.json();
        const productos = datos.products;

        console.log("JSON COMPLETO", datos)
        console.log("Arreglo de productos", productos)

        for(const producto of productos){
            crearTarjetaProducto(producto);
        }

        estadoCarga.textContent = "Productos cargados " + productos.length;

    }catch(error){
        estadoCarga.textContent = "No se pudo cargar los productos";
    }
}

function crearTarjetaProducto(producto){
    const columna = document.createElement("div");

    columna.className = "col-12 col-md-6 col-lg-4";
    columna.innerHTML = `
    <article class = "card producto-card shadow-sm">
        <img src="${producto.thumbnail}" class = "card-img-top producto-img" alt = "${producto.title}">

        <div class = "card-body">
            <span class= "badge text-bg-secondary mb-2">${producto.category}</span>
            <h3 class = "h5 card-title">${producto.title}</h3>
            <p class = "card-text producto-descripcion">
                <strong>Descripción:</strong> ${producto.description}
            </p>
            <p class = "mb-1">
                <strong>Precio:</strong>${producto.price}
            </p>
            <p class = "mb-0">
                <strong>Stock:</strong>${producto.stock}
            </p>
        </div>
    </article>
    `;

    contenedorProductos.appendChild(columna);
}