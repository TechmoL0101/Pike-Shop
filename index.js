const productos = [
    {
        name: "Botas de seguridad",
        categoria: "Seguridad",
        precio: 38000,
        imagen: "imagenes/BotasDeSeguridad.jpg"
    },
    {
        name: "Chanclas",
        categoria: "Calzado",
        precio: 12000,
        imagen: "imagenes/Matamorros.jpg"
    },
    {
        name: "Zapatos elegantes",
        categoria: "Calzado",
        precio: 28000,
        imagen: "imagenes/ZapatosFinos.jpg"
    },
    {
        name: "Zapatos deportivos",
        categoria: "Calzado",
        precio: 18000,
        imagen: "imagenes/ZapatosDeportivos.jpg"
    },
    {
        name: "Sandalias griegas",
        categoria: "Calzado",
        precio: 22000,
        imagen: "imagenes/SandaliasGriegas.jpg"
    },
    {
        name: "Pantuflas",
        categoria: "Calzado",
        precio: 11000,
        imagen: "imagenes/Pantuflas.jpg"
    },
    {
        name: "Zapatos casuales",
        categoria: "Calzado",
        precio: 15000,
        imagen: "imagenes/ZapatosCasuales.jpg"
    },
    {
        name: "Zapatos de payaso",
        categoria: "Calzado",
        precio: 19000,
        imagen: "imagenes/ZapatosDePayaso.jpg"
    }
];


// CARRITO


const carrito = [];

// ELEMENTOS DEL DOM


const contenedorProductos = document.getElementById("productos");

const lista = document.getElementById("lista");
const total = document.getElementById("total");

const buscador = document.getElementById("buscador");
const ordenar = document.getElementById("ordenar");
const moneda = document.getElementById("moneda");
const tipoCambio = 500;

// MOSTRAR PRODUCTOS


function mostrarProductos(listaProductos = productos) {
    contenedorProductos.innerHTML = "";

    listaProductos.forEach((producto) => {

        const indice = productos.indexOf(producto);
        const tarjeta = document.createElement("div");

        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.name}">
            <small class="categoria">${producto.categoria}</small>

            <h3>${producto.name}</h3>

            <p>${formatearPrecio(producto.precio)}</p>

            <button onclick="agregarProducto(${indice})">
                Agregar
            </button>
        `;

        contenedorProductos.appendChild(tarjeta);
    });

}

function formatearPrecio(precioEnColones) {
    if (moneda.value === "USD") {
        return `$${(precioEnColones / tipoCambio).toFixed(2)}`;
    }

    return `₡${precioEnColones.toLocaleString("es-CR")}`;
}


// AGREGAR PRODUCTO


function agregarProducto(i) {
    carrito.push(productos[i]);

    actualizarCarrito();

}


// ACTUALIZAR CARRITO


function actualizarCarrito() {

    let suma = 0;

    lista.innerHTML = "";

    carrito.forEach((item) => {

        suma += item.precio;

        lista.innerHTML += `
            <li>
                ${item.name} - ${formatearPrecio(item.precio)}
            </li>
        `;

    });

    total.textContent = formatearPrecio(suma);

}


// CAMBIAR TEMA


function cambiarTema() {

    document.body.classList.toggle("oscuro");

}


// BUSCADOR Y ORDENAMIENTO


function actualizarProductos() {

    const texto = buscador.value.toLowerCase();

    const filtrados = productos.filter(producto =>
        producto.name.toLowerCase().includes(texto)
    );

    if (ordenar.value === "mayor") {
        filtrados.sort((a, b) => b.precio - a.precio);
    } else if (ordenar.value === "menor") {
        filtrados.sort((a, b) => a.precio - b.precio);
    }

    mostrarProductos(filtrados);
}

buscador.addEventListener("input", actualizarProductos);
ordenar.addEventListener("change", actualizarProductos);
moneda.addEventListener("change", () => {
    actualizarProductos();
    actualizarCarrito();
});


// INICIAR APLICACIÓN

mostrarProductos();
