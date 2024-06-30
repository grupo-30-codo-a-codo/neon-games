import { baseURL } from "../configs/configs.js";

// get all products
// me gusta mas async/await
/* const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("localhost:3000/api/products", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error)); */

export const getAllProducts = async () => {
  try {
    const response = await fetch(baseURL + "/api/products", {
      method: "GET",
      redirect: "follow",
    });

    // Verifica el estado de la respuesta
    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de productos");
    }

    const parsedResponse = await response.json(); // se pasa de json a objeto
    console.log(parsedResponse);
    return parsedResponse;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return error; // Puedes decidir cómo manejar el error según tus necesidades
  }
};
