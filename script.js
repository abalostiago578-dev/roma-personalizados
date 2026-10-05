let carrito = [];

let total = 0;


// ==============================
// AGREGAR AL CARRITO
// ==============================

function agregarAlCarrito(nombre, precio) {

    carrito.push({
        nombre: nombre,
        precio: precio
    });

    total += precio;

    actualizarCarrito();
}


// ==============================
// ACTUALIZAR CARRITO
// ==============================

function actualizarCarrito() {

    const lista = document.getElementById("listaCarrito");

    const contador = document.getElementById("contador");

    const totalElemento = document.getElementById("total");


    contador.textContent = carrito.length;

    totalElemento.textContent =
        total.toLocaleString("es-AR");


    lista.innerHTML = "";


    if (carrito.length === 0) {

        lista.innerHTML =
            "<p>El carrito está vacío.</p>";

        return;
    }


    carrito.forEach((producto, indice) => {

        const elemento =
            document.createElement("p");


        elemento.innerHTML = `

            ${producto.nombre}

            - $${producto.precio.toLocaleString("es-AR")}

            <button
                onclick="eliminarDelCarrito(${indice})"
            >
                ❌
            </button>

        `;


        lista.appendChild(elemento);

    });

}


// ==============================
// ELIMINAR PRODUCTO
// ==============================

function eliminarDelCarrito(indice) {

    total -= carrito[indice].precio;

    carrito.splice(indice, 1);

    actualizarCarrito();
}


// ==============================
// FILTRAR CATEGORÍAS
// ==============================

function filtrarCategoria(categoria) {

    const productos =
        document.querySelectorAll(".producto");


    productos.forEach(producto => {

        const categoriaProducto =
            producto.dataset.categoria;


        if (
            categoria === "todos" ||
            categoriaProducto === categoria
        ) {

            producto.style.display = "block";

        } else {

            producto.style.display = "none";

        }

    });

}


// ==============================
// BUSCADOR
// ==============================

const buscador =
    document.getElementById("buscador");


buscador.addEventListener("input", function () {

    const texto =
        buscador.value.toLowerCase();


    const productos =
        document.querySelectorAll(".producto");


    productos.forEach(producto => {

        const nombre =
            producto.querySelector("h2")
            .textContent
            .toLowerCase();


        if (nombre.includes(texto)) {

            producto.style.display = "block";

        } else {

            producto.style.display = "none";

        }

    });

});
// ==============================
// ABRIR Y CERRAR CARRITO
// ==============================

const botonCarrito =
    document.getElementById("botonCarrito");

const carritoLateral =
    document.getElementById("carritoLateral");

const fondoCarrito =
    document.getElementById("fondoCarrito");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");


function abrirCarrito() {

    carritoLateral.classList.add("activo");

    fondoCarrito.classList.add("activo");

}


function cerrarCarritoFuncion() {

    carritoLateral.classList.remove("activo");

    fondoCarrito.classList.remove("activo");

}


// Botón del encabezado

botonCarrito.addEventListener("click", abrirCarrito);


// Botón X

cerrarCarrito.addEventListener(
    "click",
    cerrarCarritoFuncion
);


// Fondo oscuro

fondoCarrito.addEventListener(
    "click",
    cerrarCarritoFuncion
);
// ==============================
// FORMULARIO DE COMPRA
// ==============================

const botonFinalizar =
    document.querySelector(".finalizar");

const ventanaCompra =
    document.getElementById("ventanaCompra");

const cerrarCompra =
    document.getElementById("cerrarCompra");

const resumenPedido =
    document.getElementById("resumenPedido");


// ABRIR FORMULARIO

botonFinalizar.addEventListener("click", function () {

    if (carrito.length === 0) {

        alert("El carrito está vacío.");

        return;
    }


    mostrarResumen();

    ventanaCompra.classList.add("activo");

});


// CERRAR FORMULARIO

cerrarCompra.addEventListener("click", function () {

    ventanaCompra.classList.remove("activo");

});


// MOSTRAR RESUMEN

function mostrarResumen() {

    resumenPedido.innerHTML = "";


    carrito.forEach(function(producto) {

        const elemento =
            document.createElement("p");


        elemento.textContent =
            producto.nombre +
            " - $" +
            producto.precio.toLocaleString("es-AR");


        resumenPedido.appendChild(elemento);

    });


    const totalElemento =
        document.createElement("strong");


    totalElemento.textContent =
        "Total: $" +
        total.toLocaleString("es-AR");


    resumenPedido.appendChild(totalElemento);

}


// ==============================
// ENVIAR PEDIDO
// ==============================

const enviarPedido =
    document.getElementById("enviarPedido");


enviarPedido.addEventListener("click", function () {

    const nombre =
        document.getElementById("nombreCliente").value.trim();

    const telefono =
        document.getElementById("telefonoCliente").value.trim();

    const direccion =
        document.getElementById("direccionCliente").value.trim();


    if (
        nombre === "" ||
        telefono === "" ||
        direccion === ""
    ) {

        alert("Completá todos los campos.");

        return;
    }


    let mensaje =
        "Hola! Quiero realizar un pedido.%0A%0A";


    mensaje +=
        "Nombre: " + nombre + "%0A";

    mensaje +=
        "Teléfono: " + telefono + "%0A";

    mensaje +=
        "Dirección: " + direccion + "%0A%0A";


    mensaje +=
        "PRODUCTOS:%0A";


    carrito.forEach(function(producto) {

        mensaje +=
            "- " +
            producto.nombre +
            " - $" +
            producto.precio.toLocaleString("es-AR") +
            "%0A";

    });


    mensaje +=
        "%0ATotal: $" +
        total.toLocaleString("es-AR");


    /*
       REEMPLAZÁ ESTE NÚMERO
       POR EL WHATSAPP DE TU TIENDA.

       Formato:
       549 + código de área + número

       Ejemplo:
       5493624123456
    */

    const numeroTienda =
        "5493735479344";


    const url =
        "https://wa.me/" +
        numeroTienda +
        "?text=" +
        mensaje;


    window.open(url, "_blank");

});