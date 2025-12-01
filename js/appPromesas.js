/* ============================================
LOADER DE PUNTOS SALTANDO
============================================ */

const mostrarLoader = (contenedor) => {
    const loader = document.createElement("div");
    loader.classList.add("loader-dots");
    loader.id = "loaderTemp";

    loader.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
    `;

    contenedor.appendChild(loader);
};

const ocultarLoader = () => {
    const loader = document.getElementById("loaderTemp");
    if (loader) loader.remove();
};
/* ============================================
EJERCICIO 1 - Mostrar texto usando una PROMESA
============================================= */

const mostrarTextoConPromesa = () => {
    const input = document.getElementById("inputTexto");
    const texto = input.value.trim();

    mostrarLoader(document.body);

    new Promise((resolve, reject) => {
        if (texto === "") {
            reject("Debe ingresar un texto");
        } else {
            setTimeout(() => resolve(texto), 1500);
        }
    })
    .then(msg => alert(`Mensaje recibido: ${msg}`))
    .catch(err => alert(err))
    .finally(() => {
        ocultarLoader();
        input.value = "";
    });
};
/* ============================================
EJERCICIO 2 - Agregar texto a lista con PROMESA
============================================= */

const formLista = document.getElementById("form");
const lista = document.getElementById("lista");

formLista.addEventListener("submit", e => {
    e.preventDefault();

    const texto = document.getElementById("texto").value.trim();

    mostrarLoader(lista);

    const agregarItem = new Promise((resolve, reject) => {
        if (texto === "") {
            reject("El texto no puede estar vacío");
        } else {
            setTimeout(() => resolve(texto), 1200);
        }
    });

    agregarItem
    .then(txt => {
        const li = document.createElement("li");
        li.textContent = txt;
        lista.appendChild(li);
    })
    .catch(err => alert(err))
    .finally(() => {
        ocultarLoader();
        formLista.reset();
    });
});
/* ============================================
EJERCICIO 3 - Suma con PROMESA
============================================= */

const form2 = document.getElementById("form2");

form2.addEventListener("submit", e => {
    e.preventDefault();

    mostrarLoader(form2);

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultado = document.getElementById("resultado");

    const sumarPromesa = new Promise((resolve, reject) => {
        if (isNaN(num1) || isNaN(num2)) {
            reject("Debe ingresar números válidos");
        } else {
            setTimeout(() => resolve(num1 + num2), 1500);
        }
    });

    sumarPromesa
    .then(suma => resultado.textContent = `Resultado: ${suma}`)
    .catch(err => alert(err))
    .finally(() => {
        ocultarLoader();
        form2.reset();
    });
});
/* ============================================
EJERCICIO 4 | - Formulario de registro con PROMESAS
============================================= */

const formRegistro = document.getElementById("formRegistro");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

const contenedorUsuarios = document.getElementById("usuarios");

// ---- PROMESAS DE VALIDACIÓN ----
const validarNombreP = () => {
    return new Promise((resolve, reject) => {
        if (nombre.value.trim().length < 3) {
            reject("El nombre debe tener al menos 3 caracteres");
        } else {
            resolve();
        }
    });
};

const validarEmailP = () => {
    return new Promise((resolve, reject) => {
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email.value.trim())) {
            reject("El email no es válido");
        } else {
            resolve();
        }
    });
};

const validarPasswordP = () => {
    return new Promise((resolve, reject) => {
        if (password.value.length < 6) {
            reject("La contraseña debe tener mínimo 6 caracteres");
        } else {
            resolve();
        }
    });
};

// ---- PROCESO DEL FORMULARIO ----
formRegistro.addEventListener("submit", e => {
    e.preventDefault();

    // limpiar errores
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    mostrarLoader(formRegistro);

    Promise.allSettled([validarNombreP(), validarEmailP(), validarPasswordP()])
        .then(results => {
            let valido = true;

            if (results[0].status === "rejected") {
                errorNombre.textContent = results[0].reason;
                valido = false;
            }
            if (results[1].status === "rejected") {
                errorEmail.textContent = results[1].reason;
                valido = false;
            }
            if (results[2].status === "rejected") {
                errorPassword.textContent = results[2].reason;
                valido = false;
            }

            if (!valido) return;

            const usuario = {
                nombre: nombre.value.trim(),
                email: email.value.trim()
            };

            agregarUsuario(usuario);
            formRegistro.reset();
        })
        .finally(() => ocultarLoader());
});
// ================================
// AGREGAR USUARIO A LA LISTA (TARJETA)
// ================================
const agregarUsuario = usuario => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
        <strong>${usuario.nombre}</strong><br>
        ${usuario.email}
    `;
    contenedorUsuarios.appendChild(card);
};

/* ============================================
EJERCICIO 5 - Carrito de compras con PROMESA
============================================= */

const carrito = [];

const productos = [
    { id: 1, nombre: "Laptop", precio: 800 },
    { id: 2, nombre: "Mouse", precio: 25 },
    { id: 3, nombre: "Teclado", precio: 75 },
    { id: 4, nombre: "Monitor", precio: 300 },
    { id: 5, nombre: "Webcam", precio: 60 }
];

const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return alert("Producto no encontrado");

    mostrarLoader(document.body);

    const procesarAgregar = new Promise((resolve, reject) => {
        if (!producto) {
            reject("Producto no disponible");
        } else {
            setTimeout(() => resolve(producto), 1000);
        }
    });

    procesarAgregar
        .then(prod => {
            carrito.push(prod);
            actualizarCarrito();
            alert(`${prod.nombre} agregado al carrito`);
        })
        .catch(err => alert(err))
        .finally(() => ocultarLoader());
};

const eliminarDelCarrito = (index) => {
    mostrarLoader(document.body);

    new Promise((resolve) => {
        setTimeout(() => resolve(), 800);
    })
        .then(() => {
            carrito.splice(index, 1);
            actualizarCarrito();
            alert("Producto eliminado del carrito");
        })
        .finally(() => ocultarLoader());
};

const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
};

const actualizarCarrito = () => {
    const carritoContenedor = document.getElementById("carritoItems");
    const totalElement = document.getElementById("totalCarrito");

    carritoContenedor.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${producto.nombre} - $${producto.precio} 
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
        carritoContenedor.appendChild(li);
    });

    totalElement.textContent = `Total: $${calcularTotal()}`;
};

const vaciarCarrito = () => {
    mostrarLoader(document.body);

    new Promise((resolve) => {
        setTimeout(() => resolve(), 1200);
    })
        .then(() => {
            carrito.length = 0;
            actualizarCarrito();
            alert("Carrito vaciado");
        })
        .finally(() => ocultarLoader());
};

const procesarCompraPromesa = () => {
    if (carrito.length === 0) {
        return alert("El carrito está vacío");
    }

    mostrarLoader(document.body);

    const compra = new Promise((resolve, reject) => {
        setTimeout(() => {
            const total = calcularTotal();
            resolve(total);
        }, 1500);
    });

    compra
        .then(total => {
            alert(`Compra procesada. Total: $${total}`);
            carrito.length = 0;
            actualizarCarrito();
        })
        .finally(() => ocultarLoader());
};
