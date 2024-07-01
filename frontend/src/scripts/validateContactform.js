document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");

  form.addEventListener("submit", async function (event) {
    let isValid = true;

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => (msg.textContent = ""));

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    if (!name.value.trim()) {
      isValid = false;
      name.classList.add("error");
      document.getElementById("nameError").textContent =
        "El nombre es obligatorio.";
    } else {
      name.classList.remove("error");
    }

    if (!phone.value.trim()) {
      isValid = false;
      phone.classList.add("error");
      document.getElementById("phoneError").textContent =
        "El teléfono es obligatorio.";
    } else {
      phone.classList.remove("error");
    }

    if (!email.value.trim()) {
      isValid = false;
      email.classList.add("error");
      document.getElementById("emailError").textContent =
        "El e-mail es obligatorio.";
    } else {
      email.classList.remove("error");
    }

    if (!subject.value.trim()) {
      isValid = false;
      subject.classList.add("error");
      document.getElementById("subjectError").textContent =
        "El asunto es obligatorio.";
    } else {
      subject.classList.remove("error");
    }

    if (!message.value.trim()) {
      isValid = false;
      message.classList.add("error");
      document.getElementById("messageError").textContent =
        "El mensaje es obligatorio.";
    } else {
      message.classList.remove("error");
    }

    if (!isValid) {
      event.preventDefault();
      alert("Por favor, complete todos los campos.");
    }
    if (isValid) {
      alert("Mensaje enviado! Gracias por contactarnos");
      const data = {
        service_id: "service_ajuhd3f", // api publica, dont worrie
        template_id: "front-mobile-contact",
        user_id: "uC1hgAWfErsLEJB6U",
        template_params: {
          name: name.value,
          phone: phone.value,
          email: email.value,
          subject: subject.value,
          message: message.value,
        },
      };
      // Configuración del objeto de solicitud
      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      // Realizar la solicitud utilizando Fetch
      fetch("https://api.emailjs.com/api/v1.0/email/send", requestOptions)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Convertir la respuesta JSON
        })
        .then(function (data) {
          // Éxito: hacer algo con la respuesta
          alert("Your mail is sent!");
        })
        .catch(function (error) {
          // Error: manejar el error
          alert("Oops... " + error.message);
        });
    }
  });
});
