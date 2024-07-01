import { createNewProduct, deleteProduct, fetchProducts, updateProduct } from "../services/http";

// Almacenamiento global de productos
let allProducts = [];

// Renderizado de categorias en form selector
export const renderCategories = (categories) => {
  const categorySelector = document.querySelector("#input-category");

  categories.forEach((category) => {
    const categoryItem = document.createElement("option");
    categoryItem.classList.add("category-item");
    categoryItem.value = category.id_category;
    categoryItem.textContent = category.category_name;

    categorySelector.appendChild(categoryItem);
  });
};

// Renderizado de productos
export const renderProducts = (products) => {
  const productsList = document.querySelector("#products-list");
  productsList.innerHTML = "";
  allProducts = products

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-list-item");

    productItem.innerHTML = `
        <img src="${product.cover}" alt="${product.title}" />
        <div class="product-card-details">
            <h4>${product.title}</h4>
            <div>
                <button class="search-button">
                    <i class="bx bx-search"></i>
                </button>
                <button class="edit-button">
                    <i class="bx bx-edit"></i>
                </button>
                <button class="delete-button">
                    <i class="bx bx-trash"></i>
                </button>
            </div>
        </div>
    `;

    const searchButton = productItem.querySelector(".search-button");
    const editButton = productItem.querySelector(".edit-button");
    const deleteButton = productItem.querySelector(".delete-button");

    searchButton.onclick = () => renderProductDetails(product);
    editButton.onclick = () => editDetails(product);
    deleteButton.onclick = () => deleteProductHandler(product.id_product);

    productsList.appendChild(productItem);
  });
};

// Para renderizar detalles de producto en card derecha al clickear en lupa de card de producto
const renderProductDetails = (product) => {
  const dashboardResume = document.querySelector("#dashboard-resume");
  dashboardResume.scrollIntoView({ behavior: "smooth" });

  const productSpecs = document.querySelector("#product-details");
  productSpecs.innerHTML = "";
  productSpecs.innerHTML = `
        <div class="product-detail">
            <h4>${product.title}</h4>
            <ul>
                <li>
                    <span>Precio:</span>
                    <span>$${product.price}</span>
                </li>
                <li>
                    <span>Categoría:</span>
                    <span>${product.id_category}</span>
                </li>
                <li>
                    <span>Desarrolladora:</span>
                    <span>${product.developer}</span>
                </li>
                <li>
                    <span>Imagen:</span>
                    <span>
                        <a href="${product.cover}" target="_blank">Portada de ${product.title}</a>
                    </span>
                </li>
            </ul>
            <div id="fast-access-buttons">
                <button type="button" id="edit-product-btn">
                    Editar producto
                </button>
                <button type="button" id="delete-product-btn">
                    Eliminar producto
                </button>
            </div>
        </div>
    `;

  /* Scroll hacia form para editar productos */
  const editDetailsButton = productSpecs.querySelector("#edit-product-btn");
  editDetailsButton.onclick = () => editDetails(product);

  const deleteProductButton = productSpecs.querySelector('#delete-product-btn');
  deleteProductButton.onclick = () => deleteProductHandler(product.id_product); 

};

// Para renderizar detalles en formulario de edición y ejecutar petición PUT
const editDetails = (product) => {
  const dashboardForm = document.querySelector("#dashboard-form");
  dashboardForm.scrollIntoView({ behavior: "smooth" });

  dashboardForm.querySelector("#input-name").value = product.title;
  dashboardForm.querySelector("#input-price").value = product.price;
  dashboardForm.querySelector("#input-category").value = product.id_category;
  dashboardForm.querySelector("#input-developer").value = product.developer;
  dashboardForm.querySelector("#input-image").value = product.cover;

  dashboardForm.onsubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id_product: product.id_product,
      title: dashboardForm.querySelector("#input-name").value,
      price: dashboardForm.querySelector("#input-price").value,
      id_category: dashboardForm.querySelector("#input-category").value,
      developer: dashboardForm.querySelector("#input-developer").value,
      cover: dashboardForm.querySelector("#input-image").value,
    };

    await updateProduct(updatedProduct);
    fetchProducts();
    clearForm();
  };
};

// Eliminar un producto en particular al clickear en botón 'eliminar'
const deleteProductHandler = async (productId) => {
  await deleteProduct(productId);
  fetchProducts();
};

// Creación de productos
const createProduct = () => {
  const dashboardForm = document.querySelector("#dashboard-form");

  // Manejo del form para creación de nuevos productos (agregar validación)
  dashboardForm.onsubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      title: dashboardForm.querySelector("#input-name").value,
      price: dashboardForm.querySelector("#input-price").value,
      id_category: dashboardForm.querySelector("#input-category").value,
      developer: dashboardForm.querySelector("#input-developer").value,
      cover: dashboardForm.querySelector("#input-image").value,
    };

    await createNewProduct(newProduct);
    fetchProducts();
    clearForm();
  };
};
createProduct();

// Ejecutor de scroll al clickear en botones particulares
const checkDetails = () => {
  const dashboardResume = document.querySelector("#dashboard-resume");
  const checkDetailsBtn = document.querySelector("#check-details");
  checkDetailsBtn.onclick = () =>
    dashboardResume.scrollIntoView({ behavior: "smooth" });
};
checkDetails();

// Reiniciar el form cuando se clickea en botón 'limpiar' o cuando se hace submit del form
const clearForm = () => {
  const dashboardForm = document.querySelector("#dashboard-form");
  dashboardForm.reset();
};

const clearFormClick = () => {
  const dashboardForm = document.querySelector("#dashboard-form");
  const clearFormBtn = dashboardForm.querySelector("#clean-button");
  clearFormBtn.onclick = () => {
    dashboardForm.reset();
  };
};
clearFormClick();

// Gestión de búsqueda en barra superior 
const handleSearch = () => {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-game");

  const performSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    console.log("Search Term:", searchTerm);
    console.log("All Products:", allProducts);

    if (searchTerm.length === 0) {
      console.log("Restoring original products");
      renderProducts(allProducts); //! Si el input está vacío se deberían renderizar todos los productos, fix acá
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
      console.log("Filtered Products:", filteredProducts);
      renderProducts(filteredProducts);
    }
  };

  searchForm.onsubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  searchInput.oninput = () => {
    performSearch();
  };
};


export {handleSearch, allProducts}