import { baseURL } from "../configs/configs.js";

export const createOrder = async (id_user, jwt) => {
  try {
    //este post necesia el iduser y el jwt para continuar, osea un usuario logueado
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    const raw = JSON.stringify({
      id_user: id_user,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(baseURL + "/api/orders/", requestOptions);

    // Verifica el estado de la respuesta
    if (!response.ok) {
      throw new Error("No se pudo crear la orden,intenta mas tarde");
    }

    const parsedResponse = await response.json(); // se pasa de json a objeto
    console.log("Respuesta del alta de la Orden:",parsedResponse);
    return parsedResponse;
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    alert(error.message);
    return error; // Puedes decidir cómo manejar el error según tus necesidades
  }
};

export const createOrderDetail = async (id_user, jwt, id_order, details) => {
  try {
    //este post necesia id_user y el jwt y un [] de detalles de productos para continuar
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    let arrayDetails = [];

    details.map((producto) => {
      arrayDetails.push({
        createdAt: new Date(),
        id_order: id_order,
        id_product: producto.producto.id_product,
        quantity: producto.cantidad,
        price: producto.producto.price,
      });
    });

    const raw = JSON.stringify(arrayDetails);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      baseURL + "/api/order-details-multiple",
      requestOptions
    );

    // Verifica el estado de la respuesta
    if (!response.ok) {
      throw new Error("No se pudo crear la lista de detalles");
    }

    const parsedResponse = await response.json(); // se pasa de json a objeto
    console.log("Respuesta del alta de los detalles de la orden",parsedResponse);
    return parsedResponse;
  } catch (error) {
    console.error(error);
    return error; // Puedes decidir cómo manejar el error según tus necesidades
  }
};

export const getOrderWithDetails = async (jwt, id_order) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      baseURL + `/api/orders/complete/${id_order}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la orden completa");
    }
    const parsedResponse = await response.json(); // se pasa de json a objeto
    console.log("Respuesta al get de la orden y sus detalles",parsedResponse);
    return parsedResponse;
  } catch (error) {
    console.log(error);
  }
};
