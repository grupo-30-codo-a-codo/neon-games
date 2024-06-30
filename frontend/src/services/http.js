import { renderCategories, renderProducts } from "../scripts/dashboard";

const dashboardPath = location.href;
if (dashboardPath.includes("dashboard")) {
  fetchProducts();
  fetchCategories();
}


async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:3000/api/categories");
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor...");
    }
    const data = await response.json();
    renderCategories(data);
  } catch (error) {
    console.error("Hay un problema con la petición:", error);
  }
}


async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor...");
    }
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Hay un problema con la petición:", error);
  }
}


export async function updateProduct(product) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${product.id_product}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el producto...");
    }

    const data = await response.json();
    console.log("Product updated:", data);
    fetchProducts();
  } catch (error) {
    console.error("Hay un problema con la actualización:", error);
  }
}


export async function deleteProduct(productId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el producto...");
    }

    const data = await response.json();
    console.log("Product deleted:", data);
    fetchProducts(); // Re-render the products list after deleting
  } catch (error) {
    console.error("Hay un problema con la eliminación:", error);
  }
}



/* 
Productos
{
    "id_product": 1,
    "cover": "URL",
    "title": "Age of Empires II Definitive Edition",
    "price": "10.99",
    "discount_price": null,
    "id_category": 1,
    "game_description": "Un clásico juego de estrategia en tiempo real que regresa con gráficos mejorados en 4K, nuevo contenido y algunas mejoras en la jugabilidad.",
    "developer": "Ensemble Studios"
}

Categorias
{
    "id_category": 2,
    "category_name": "Battle Royale"
}


*/
