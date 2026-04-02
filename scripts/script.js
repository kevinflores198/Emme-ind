let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        0: {
            slidesPerView: 2, // MOBILE → 2 CARDS
        },
        768: {
            slidesPerView: 3, // DESKTOP → 3 CARDS
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const arrowUp = document.getElementById("arrowUp");
const contactMe = document.getElementById("contactMe");

window.addEventListener("scroll", () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll > 100) {
        arrowUp.style.right = 20 + "px";
    } else {
        arrowUp.style.right = -100 + "px";
    }
});

new simpleParallax(document.querySelectorAll('.parallax'), {
    scale: 1.2,
    delay: 0.4
});


window.addEventListener("scroll", () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll > 100) {
        contactMe.style.left = 20 + "px";
    } else {
        contactMe.style.left = -100 + "px";
    }
});

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

function actualizarContador() {
    document.getElementById("contador").innerText = carrito.length;
}

function agregarAlCarrito(boton, nombre) {

    const card = boton.closest(".card");

    const color = card.querySelector(".color").value;
    const talle = card.querySelector(".talle").value;

    const producto = {
        id: Date.now(),
        nombre: nombre,
        color: color,
        talle: talle
    };

    carrito.push(producto);
    mostrarToast("Producto agregado al carrito 🛒");
    guardar();
    renderCarrito();
}

function abrirCarrito() {
    renderCarrito();
    document.getElementById("modal").style.display = "flex";
}

function cerrarCarrito() {
    document.getElementById("modal").style.display = "none";
}


function renderCarrito() {
    const resumen = document.getElementById("resumen");
    resumen.innerHTML = "";

    if (carrito.length === 0) {
        resumen.innerHTML = "<p class='text-center text-gray-500'>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach((item, index) => {
        resumen.innerHTML += `
        <li class="list-none mb-4">
            <input type="radio" name="producto" id="prod-${item.id}" class="hidden peer" />

            <label for="prod-${item.id}"
                class="flex items-center w-full p-4 bg-white border border-gray-200 rounded-xl cursor-pointer 
                hover:bg-gray-100 peer-checked:border-[#ffd900] peer-checked:bg-yellow-50 transition">

                <!-- Icono -->
                <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600">
                    🛍
                </div>

                <!-- Info -->
                <div class="ml-3 flex-1">
                    <div class="font-semibold text-gray-800">${item.nombre}</div>
                    <div class="text-sm text-gray-500">
                        Color: ${item.color} · Talle: ${item.talle}
                    </div>
                </div>

                <div class="text-sm font-bold text-black">$17.000</div>

                <!-- Botón eliminar -->
                <button onclick="event.preventDefault(); eliminarProducto(${item.id})"
                    class="text-red-500 hover:text-red-700 text-sm">
                    ❌
                </button>

            </label>
        </li>
        `;
    });
}

function toast(msg) {
    const t = document.createElement("div");
    t.innerText = msg;
    t.className = "fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded";
    document.body.appendChild(t);

    setTimeout(() => t.remove(), 2000);
}

function mostrarToast(mensaje, tipo = "ok") {
    const toast = document.getElementById("toast");

    toast.innerHTML = `
      <div class="px-4 py-3 rounded-lg shadow-lg text-white 
      ${tipo === "ok" ? "bg-green-600" : "bg-red-600"} 
      animate-fade">
        ${mensaje}
      </div>
    `;

    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2500);
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        mostrarToast("Tu carrito está vacío.", "error");
        return;
    }

    let mensaje = "Hola! Me han gustado estos productos y quisiera saber cómo puedo pagarlos 😊\n\n";

    carrito.forEach((item, index) => {
        mensaje += `🛍 Producto ${index + 1}\n`;
        mensaje += `• ${item.nombre}\n`;
        mensaje += `• Color: ${item.color}\n`;
        mensaje += `• Talle: ${item.talle}\n\n`;
    });

    const telefono = "5491123941362"; // cambiar por el número real
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}
function eliminarProducto(id) {
    const confirmar = confirm("¿Seguro que querés eliminar este artículo del carrito?");

    if (!confirmar) return;

    carrito = carrito.filter(p => p.id !== id);
    guardar();
    renderCarrito();
}

const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTuABS33PBRC0grHK2viW6coX_knf0D0W5C9sNWnJN8ZC4omF8aKDdheJlUkLWJKReoD5so84ZcIf4o/pub?output=csv";

fetch(URL)
    .then(res => res.text())
    .then(data => {
        console.log(data);
        const filas = data.split("\n")
            .slice(1)
            .filter(f => f.trim() !== "");

        const productos = filas.map(fila => {
            const columnas = fila.split(",");

            if (columnas.length < 6) return null;

            const [id, nombre, precio, color, talle, imagen] = columnas;

            return {
                id,
                nombre,
                precio,
                colores: color.split("|"),
                talles: talle.split("|"),
                imagen
            };
        }).filter(p => p !== null);;

        console.log(productos);
        renderProductos(productos);
    });

function renderProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {

        const coloresHTML = p.colores.map(c => `<option>${c}</option>`).join("");
        const tallesHTML = p.talles.map(t => `<option>${t}</option>`).join("");

        contenedor.innerHTML += `
    
    <div class="card rounded-xl bg-[#D9D9D9] w-full max-w-sm shadow">

        <img src="${p.imagen}" class="w-full object-cover p-1 rounded-lg"/>

        <div class="p-3">

            <!-- nombre -->
            <h5 class="text-xl text-center font-semibold">${p.nombre}</h5>

            <!-- selects -->
            <div class="flex flex-col gap-4 mt-4">

                <div class="flex gap-4">

                    <div class="flex flex-col w-1/2">
                        <label class="text-sm text-gray-600 mb-1">Color</label>
                        <select class="color w-full px-3 py-2 rounded-lg border border-gray-300 text-sm">
                            ${coloresHTML}
                        </select>
                    </div>

                    <div class="flex flex-col w-1/2">
                        <label class="text-sm text-gray-600 mb-1">Talle</label>
                        <select class="talle w-full px-3 py-2 rounded-lg border border-gray-300 text-sm">
                            ${tallesHTML}
                        </select>
                    </div>

                </div>

                <!-- precio -->
                <span class="text-3xl font-extrabold text-center">$${p.precio}</span>

                <!-- botón -->
                <button 
                        onclick="agregarAlCarrito(this, '${p.nombre}')"
                        data-precio="${p.precio}"
                        data-id="${p.id}"
                        >
                    Agregar al carrito
                </button>

            </div>
        </div>
    </div>
    `;
    });
}

actualizarContador();