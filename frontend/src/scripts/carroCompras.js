const mockedCarroEjemplo = [
  {
    producto: {
      cover:
        "https://res.cloudinary.com/dtrs7cus2/image/upload/v1719066580/age-of-empires_II_DE_fr43vy.jpg",
      developer: "Ensemble Studios",
      discount_price: null,
      game_description:
        "Un clásico juego de estrategia en tiempo real que regresa con gráficos mejorados en 4K, nuevo contenido y algunas mejoras en la jugabilidad.",
      id_category: 1,
      id_product: 1,
      price: "6.99",
      title: "Age of Empires II Definitive Edition",
    },
    cantidad: 0,
  },
];

const container = document.getElementById("cart-list");
const resumeContainer = document.getElementById("items-list");
import { crearOrdenAndDetails } from "./orders";

const validateCarroOrCreateon = () => {
  let carroCompras = [];
  // Recuperar la cadena JSON desde localStorage
  let storedObjetos = localStorage.getItem("carroDeCompras");
  let arrayObjetosRecuperado = JSON.parse(storedObjetos);
  //si ya exsites y tiene algo
  if (arrayObjetosRecuperado && arrayObjetosRecuperado.length > 0) {
    return;
  } else {
    //lo creo en el local
    localStorage.setItem("carroDeCompras", JSON.stringify(carroCompras));
  }
};
validateCarroOrCreateon();

export const obtenerCarroDelLocal = () => {
  // Recuperar la cadena JSON desde localStorage
  let storedObjetos = localStorage.getItem("carroDeCompras");

  // Convertir de nuevo a un array de objetos usando JSON.parse()
  let arrayObjetosRecuperado = JSON.parse(storedObjetos);
  return arrayObjetosRecuperado;
};

export function mostrarCarro() {
  try {
    let allProductsonCart = obtenerCarroDelLocal();
    container.innerHTML = "";
    resumeContainer.innerHTML = "";
    if (allProductsonCart.length === 0) {
      const mensaje = document.createElement("div");
      mensaje.classList.add("cart-item");
      mensaje.innerHTML = `
                      <div class="card" style="color:white;padding:25px;">
                        No se registró ningun producto en tu carro :D
                      </div>
                    `;
      container.appendChild(mensaje);
      resumeContainer.innerHTML = "";
      return;
    }

    allProductsonCart.forEach((producto, index) => {
      //lista prods
      const card = document.createElement("div");
      card.classList.add("cart-item");
      card.innerHTML = `
                        <div class="item-description">
                  <img
                    src="${producto.producto.cover}"
                    alt="${producto.producto.title}"
                  />
                  <div class="item-details">
                    <h3>${producto.producto.title}</h3>
                    <ul>
                      <li>Genero: Fun</li>
                      <li>Otros títulos: No modelado</li>
                      <li>Calificación: No modelado</li>
                    </ul>
                  </div>
                </div>
                <div class="item-details_commercial">
                  <div>
                    <div>
                      <h4>Precio:</h4>
                      <p>${producto.producto.price}</p>
                    </div>
                    <div>
                      <h4>Cantidad:</h4>
                      <p>${producto.cantidad}</p>
                    </div>
                  </div>
                  <div class="item-buttons">
                    <button id="delete-button${index}" class="delete-button">
                      <i class="bx bx-trash"></i>
                    </button>
                    <button id="decrement-button${index}" class="decrement-button">
                      <i class="bx bx-minus"></i>
                    </button>
                    <button id="increment-button${index}" class="increment-button">
                      <i class="bx bx-plus"></i>
                    </button>
                  </div>
                  </div>`;
      container.appendChild(card);
      container.appendChild(document.createElement("hr"));
      const incrementBtn = document.getElementById(`increment-button${index}`);
      const decremenetBtn = document.getElementById(`decrement-button${index}`);
      const deleteBtn = document.getElementById(`delete-button${index}`);
      incrementBtn.addEventListener("click", () => {
        modificarCantidad(producto.producto.id_product, true);
      });
      decremenetBtn.addEventListener("click", () => {
        modificarCantidad(producto.producto.id_product, false);
      });
      deleteBtn.addEventListener("click", () => {
        eliminarProducto(producto.producto.id_product);
      });
      //lista del resumen
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = `
       <span>${producto.producto.title}</span>
                  <span>$${(
                    producto.producto.price * producto.cantidad
                  ).toFixed(2)}</span>
      `;

      resumeContainer.appendChild(listItem);
    });
    const divBotones = document.createElement("div");
    divBotones.innerHTML = ` <button id="confirm-button">Confirmar compra</button>
                <button id="reset-cart">Limpiar carro</button>`;
    resumeContainer.appendChild(divBotones);
    document.getElementById("reset-cart").addEventListener("click", () => {
      return limpiarCarro();
    });
    //agrego el evento para disparar compra al btn con id id="confirm-button"
    document.getElementById("confirm-button").addEventListener("click", () => {
      //uso la funcion importada desde orders.js
      crearOrdenAndDetails();
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

export function agregarAlCarro(productoAdd) {
  const carroDeCompras = obtenerCarroDelLocal();

  // Verificar si el producto ya está en el carro
  let index = carroDeCompras.findIndex(
    (item) => item.producto.id_product === productoAdd.id_product
  );

  if (index !== -1) {
    // Si el producto ya existe, aumentar la cantidad
    carroDeCompras[index].cantidad++;
  } else {
    // Si es un producto nuevo, agregarlo al carro
    carroDeCompras.push({
      producto: productoAdd,
      cantidad: 1,
    });
  }

  console.log(carroDeCompras);
  // Actualizar el localStorage
  localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras));
}

function modificarCantidad(idProducto, masOmenos) {
  let carroDeCompras = obtenerCarroDelLocal();
  //obtener el indice del producto
  let index = carroDeCompras.findIndex(
    (item) => item.producto.id_product === idProducto
  );

  if (masOmenos) {
    carroDeCompras[index].cantidad++;
  } else {
    if (carroDeCompras[index].cantidad > 1) {
      carroDeCompras[index].cantidad--;
    }
  }

  // Actualizar el localStorage
  localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras));
  manageItemsInCartValue();
  mostrarCarro();
}

const eliminarProducto = (idProducto) => {
  let carroDeCompras = obtenerCarroDelLocal();
  //obtener el indice del producto
  let index = carroDeCompras.findIndex(
    (item) => item.producto.id_product === idProducto
  );

  carroDeCompras.splice(index, 1);
  localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras));
  manageItemsInCartValue();
  mostrarCarro();
};

// Función para limpiar el carro de compras en localStorage
export function limpiarCarro() {
  let carroDeCompras = [];
  localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras));
  manageItemsInCartValue();
  mostrarCarro()
 // location.reload();
}

export const manageItemsInCartValue = () => {
  const redCircle = document.getElementById("items-in-cart");
  let carroDeCompras = obtenerCarroDelLocal();

  if (!carroDeCompras) return;
  if (carroDeCompras.length === 0) {
    redCircle.style.display = "none";
    redCircle.innerText = "";
    return;
  }
  let unidadesTotales = 0;

  carroDeCompras.map((producto) => {
    unidadesTotales = unidadesTotales + producto.cantidad;
  });

  redCircle.style.display = "block";
  redCircle.innerText = unidadesTotales;
};

manageItemsInCartValue();
