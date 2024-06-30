//iterar la response, crear el html con js y sumarlo al dom
//objeto de ejemplo
const mocked = {
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
};
import { getAllProducts } from "../services/products";
import { agregarAlCarro, manageItemsInCartValue } from "./carroCompras";
const container = document.getElementById("grid-container-cards");
const searchInput = document.getElementById("search-input");
const resetButton = document.getElementById("reset-button");

let allProducts = [];
              

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
validateCarroOrCreateon()

document.addEventListener("DOMContentLoaded", async function () {
  try {
    allProducts = await getAllProducts();
    localStorage.setItem("productos", JSON.stringify(allProducts)); //paso los productos al localstorage, por las dudas jaja
    // Limpia el contenedor antes de mostrar nuevos productos
    container.innerHTML = "";

    if (allProducts.length === 0) {
      const mensaje = document.createElement("div");
      mensaje.classList.add("border-card");
      mensaje.innerHTML = `
        <div class="card">
          No se encontró ningún juego para la búsqueda realizada, prueba con otra :D
        </div>
      `;
      container.appendChild(mensaje);
    }

    allProducts.forEach((producto, index) => {
      const card = document.createElement("div");
      card.classList.add("border-card");
      card.id = "game-card";
      card.innerHTML = `
        <div class="card">
        <button id="add-button-${index}" class="add-button">+</button>
          <img src="${producto.cover}" alt="${producto.title}" class="cover"   loading="lazy" />
          <div class="description">
            <h2 class="title-card">${producto.title}</h2>
            <h3 class="price">${producto.price}</h3>
          </div>
        </div>
      `;
      container.appendChild(card);
      const addCartItem = document.getElementById(`add-button-${index}`);

      addCartItem.addEventListener("click", () => {
        agregarAlCarro(producto);
        manageItemsInCartValue()
        alert(`Se agregó el juego ${producto.title} al carrito`)
      });
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
});

// Función para mostrar productos filtrados
const displayProducts = (products) => {
  // Limpiar el contenedor de productos
  container.innerHTML = "";

  try {
    if (products.length === 0) {
      const mensaje = document.createElement("div");
      // mensaje.classList.add("");
      mensaje.innerHTML = `
        <div class="card">
          No se encontró ningún juego para la búsqueda realizada, prueba con otra :D
        </div>
      `;
      container.appendChild(mensaje);
    }

    products.forEach((producto, index) => {
      const card = document.createElement("div");
      card.classList.add("border-card");
      card.id = "game-card";
      card.innerHTML = `
        <div class="card">
        <button id="add-button-${index}" class="add-button">+</button>
          <img src="${producto.cover}" alt="${producto.title}" class="cover"   loading="lazy" />
          <div class="description">
            <h2 class="title-card">${producto.title}</h2>
            <h3 class="price">${producto.price}</h3>
          </div>
        </div>
      `;
      container.appendChild(card);
      const addCartItem = document.getElementById(`add-button-${index}`);

      addCartItem.addEventListener("click", () => {
        agregarAlCarro(producto);
        manageItemsInCartValue()
        alert(`Se agregó el juego ${producto.title} al carrito`)
      });
    });
  } catch (error) {
    console.error("Error al mostrar productos:", error);
  }
};

// Evento para manejar la búsqueda de productos
searchInput.addEventListener("input", () => {
  try {
    const searchText = searchInput.value.trim().toLowerCase();
    if (searchText.length === 0) {
      displayProducts(allProducts);
      document.getElementById("reset-button").style.display = "none";
      return;
    }
    document.getElementById("reset-button").style.display = "block";

    // Filtrar productos según el texto de búsqueda
    const filteredProducts = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchText) ||
        product.game_description.toLowerCase().includes(searchText)
    );

    // Mostrar productos filtrados en la interfaz
    displayProducts(filteredProducts);
  } catch (error) {
    console.error("Error al buscar productos:", error);
  }
});

resetButton.addEventListener("click", () => {
  searchInput.value = ""; //borra el contenido del input
  resetButton.style.display = "none"; //se esconde el boton para hacer reset en el input
  searchInput.focus(); //hace foco en el input de search
  displayProducts(allProducts); // muestra todos los productos nuevamente
});
