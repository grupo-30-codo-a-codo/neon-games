import { loginUser, registerUser } from "../services/authScript.js";

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
      const data = await loginUser(username, password);
    } catch (error) {
      console.error("Error en la solicitud del login.", error);
    }
  });

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
      const data = await registerUser(username, email, password);
    } catch (error) {
      console.error("Error en la solicitud del registro.", error);
    }
  });


