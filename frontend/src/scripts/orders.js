import {
  createOrder,
  getOrderWithDetails,
  createOrderDetail,
} from "../services/orders";
import { limpiarCarro } from "./carroCompras";
import { obtenerCarroDelLocal } from "./carroCompras";
/* 
//borrar esto que esta harcodeado y deberia hacerse en el login
localStorage.setItem(
  "token",
  JSON.stringify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiY0Bob3RtYWlsLmNvbSIsImlhdCI6MTcxOTY2NzYzOSwiZXhwIjoxNzE5ODQwNDM5fQ.MiSbbQi8CnPiiKgBEerKRV238DjxjAK9z-dZ04ozJq4"
  )
);
localStorage.setItem("id_user", JSON.stringify(1));
//// */

export const crearOrdenAndDetails = async () => {
  try {
    //validar
    //que este la clave id_user en localsotage y con su value, y JWT tambien
    let id_user;
    let jwt;
    // Recuperar la cadena JSON desde localStorage
    let storedUser = localStorage.getItem("id_user");
    let storedJWT = localStorage.getItem("token");
    id_user = JSON.parse(storedUser);
    jwt = JSON.parse(storedJWT);

    if (!id_user || !jwt) {
      return alert("Debes estar logueado para continuar");
    }

    const carroCompras = obtenerCarroDelLocal();
    //validar que el carro tenga productos antes de iniciar la request
    if (carroCompras.length === 0) {
      return alert("No puede continuar si no a agregado contenido asu carro");
    }

    //console.log(carroCompras);

    //creo la orden usando el service post order
    const order = await createOrder(id_user, jwt);
    //id de la orden necesaria para el post de los order_details
    let order_id = order.id;

    await createOrderDetail(id_user, jwt, order_id, carroCompras);
    const ordenCompleta = await getOrderWithDetails(jwt, order_id);
    //se limpia el carro una vez realizada la compra y se muestra un mensajito
    limpiarCarro();
    alert(
      `Su ORDEN N°: ${order_id}\nSe procesó exitosamente\nDisfrutá de tus juegos\nNEONGAMES`
    );
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};
