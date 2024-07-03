import { baseURL } from "../configs/configs.js";

import {
  handleSearch,
  renderCategories,
  renderProducts,
} from "../scripts/dashboard";

const dashboardPath = location.href;
if (dashboardPath.includes("dashboard")) {
  fetchProducts();
  setTimeout(() => {
    fetchCategories();
  }, 1000);
}

async function fetchCategories() {
  try {
    const response = await fetch(baseURL + "/api/categories");
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
    const response = await fetch(baseURL + "/api/products");
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor...");
    }
    const data = await response.json();
    renderProducts(data);
    handleSearch();
  } catch (error) {
    console.error("Hay un problema con la petición:", error);
  }
}

async function updateProduct(product) {
  try {
    const response = await fetch(
      baseURL + `/api/products/${product.id_product}`,
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
  } catch (error) {
    console.error("Hay un problema con la actualización:", error);
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(baseURL + `/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto...");
    }

    const data = await response.json();
    console.log("Product deleted:", data);
  } catch (error) {
    console.error("Hay un problema con la eliminación:", error);
  }
}

async function createNewProduct(product) {
  try {
    const response = await fetch(baseURL + "/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Error al crear el producto...");
    }

    const data = await response.json();
    console.log("Product created:", data);
  } catch (error) {
    console.error("Hay un problema con la creación del producto:", error);
  }
}

export { fetchProducts, deleteProduct, updateProduct, createNewProduct };
