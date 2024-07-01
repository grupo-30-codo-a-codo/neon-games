import { baseURL } from "../configs/configs.js";

const apiBaseURL = baseURL + "/api/users";

export async function loginUser(email, password) {
  try {
    const response = await fetch(apiBaseURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login exitoso.", data);
      localStorage.setItem("token", JSON.stringify(data.userData.token.token));
      localStorage.setItem("id_user", JSON.stringify(data.userData.id_user));
      alert(data.message);
      return data;
    } else {
      const errorData = await response.json();
      console.error("Error al iniciar sesión.", errorData.message);
      alert("Error al iniciar sesión, intenta nuevamente." + errorData.message);
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error en la solicitud.", error);
    throw error;
  }
}

export async function registerUser(name, email, password) {
  try {
    const response = await fetch(apiBaseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registro exitoso.", data);
      alert("Registro exitoso, ¡Ya te has unido, bienvenido a Neongames! 😊");
      return data;
    } else {
      const errorData = await response.json();
      console.error("Error al registrarse:", errorData.message);
      alert(
        "Error al registrarse, no te has unido aún a Neongames 🥲 " +
          errorData.message
      );
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error en la solicitud.", error);
    throw error;
  }
}
