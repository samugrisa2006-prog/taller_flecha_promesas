// ================================
// Evento DOMContentLoaded
// ================================
window.addEventListener('DOMContentLoaded', () => {
    alert('Bienvenido a la página de Funciones Flecha en JavaScript');
});

// ================================
// Ejercicio 1: Mostrar texto
// ================================
const mostrarTexto = () => {
    const input = document.getElementById('inputTexto');
    const texto = input.value.trim();

    if (!texto) return alert('Por favor, ingrese un texto');

    alert(`Texto ingresado: ${texto}`);
    input.value = '';
};

// ================================
// Ejercicio 2: Agregar texto a la lista
// ================================
const formLista = document.getElementById('form');
const lista = document.getElementById('lista');

formLista.addEventListener('submit', (e) => {
    e.preventDefault();

    const texto = document.getElementById('texto').value.trim();
    if (!texto) return alert('Por favor, ingrese un texto');

    const li = document.createElement('li');
    li.textContent = texto;
    lista.appendChild(li);

    formLista.reset();
});

// ================================
// Ejercicio 3: Sumar con función flecha
// ================================
const form2 = document.getElementById('form2');

form2.addEventListener('submit', (e) => {
    e.preventDefault();

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultado = document.getElementById('resultado');

    if (isNaN(num1) || isNaN(num2)) {
        return alert('Por favor, ingrese números válidos');
    }

    const sumar = (a, b) => a + b;

    resultado.textContent = `Resultado: ${sumar(num1, num2)}`;
    form2.reset();
});

// Ejercicio 4: ================================
const formRegistro = document.getElementById("formRegistro");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

const contenedorUsuarios = document.getElementById("usuarios");

// Validaciones
const validarNombre = () => {
    if (nombre.value.trim().length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres";
        return false;
    }
    errorNombre.textContent = "";
    return true;
};

const validarEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email.value.trim())) {
        errorEmail.textContent = "Ingrese un email válido";
        return false;
    }
    errorEmail.textContent = "";
    return true;
};

const validarPassword = () => {
    if (password.value.length < 6) {
        errorPassword.textContent = "La contraseña debe tener mínimo 6 caracteres";
        return false;
    }
    errorPassword.textContent = "";
    return true;
};

// Eventos de validación
nombre.addEventListener("input", validarNombre);
email.addEventListener("input", validarEmail);
password.addEventListener("input", validarPassword);

// ================================
// Procesar el formulario de registro
// ================================
formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const valido =
        validarNombre() &
        validarEmail() &
        validarPassword();

    if (!valido) {
        alert("Por favor, corrija los errores antes de continuar.");
        return;
    }
    const usuario = {
         nombre: nombre.value.trim(),
         email: email.value.trim(),
         password: password.value.trim()
};  

    agregarUsuario(usuario);

    formRegistro.reset();
});



// ================================
// Mostrar usuario registrado
// ================================
const agregarUsuario = (usuario) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
        <strong>${usuario.nombre}</strong><br>
        ${usuario.email}
    `;
    contenedorUsuarios.appendChild(card);
};

// ================================
// Ejercicio 5: Carrito de compras
// ================================
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

    carrito.push(producto);
    actualizarCarrito();
    alert(`${producto.nombre} agregado al carrito`);
};

const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    actualizarCarrito();
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
    carrito.length = 0;
    actualizarCarrito();
    alert("Carrito vaciado");
};

const procesarCompra = () => {
    if (carrito.length === 0) {
        return alert("El carrito está vacío");
    }
    const total = calcularTotal();
    alert(`Compra procesada. Total: $${total}`);
    vaciarCarrito();
};
