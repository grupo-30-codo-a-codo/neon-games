const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../config/dbConfig");

//Explain:
/*
Este middleware  se usa antes de que se dispare el metodo login, verifica la existencias del usuario
y genera un JWT que devuelve al front en forma de cookie o bien puede ser una response,
para dar de alta la session del usuario y permitirle el uso de metodos privados al resto de los 
visitantes del sitio, por ejemplo efectuar una compra
*/

function authenticateUser(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Se requieren email y contraseña" });
  }

  //validar que el email tenga la estructura de un email ej: abc@dominio.com
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email.match(emailRegex)) {
    return res.status(500).send({ message: "Eso no parece un email" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  Users.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    //Si no existe el user
    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: " Email o contraseña incorrectos" });
    }
    //Si existe el usuario...
    const user = results[0];
    //Se compara la pass en la base con la pass ingresada en el front, usando bcrypt, la
    //libreria que se uso para encriptar la pass
    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error("Error al comparar contraseñas:", bcryptErr);
        return res.status(500).json({ message: "Error interno del servidor" });
      }
      //Si la pass no es la correcta
      if (!bcryptResult) {
        return res
          .status(401)
          .json({ message: " Email o contraseña incorrectos" });
      }

      // Si las credenciales son válidas, generamos un token JWT
      //con la info que quieras, en este caso leagrego el mail y el id, mas la secret word que es requisito del metodo
      const token = jwt.sign(
        { id: user.id, username: user.email },
        process.env.JWT_SECRET, // Secreto utilizado para firmar el token, deberia estar en el .env,
        { expiresIn: "48h" } // Tiempo de expiración del token (ejemplo: 48 hora)
      );

      // Almacenamos el token y el user en la request del front, y devolvemos todo junto en el metodo login
      req.token = { token: token }; // Ejemplo utilizando cookies
      req.user = user;

      next(); // Llama a la siguiente función que se declare en las routes...
    });
  });
}

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  // desd eel front debe agregar al fetch el header "Authorization: token ", el token que fué enviado al loguearce
  const authHeader = req.headers["authorization"];
  //si no viene el encabezado o header
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado, token no proporcionado" });
  }

  // El encabezado de autorización debe tener la estructura "Bearer token", es es un tipo de auth, hay muchos mas
  const token = authHeader.split(" ")[1];
  //si no viene el token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado, token no proporcionado" });
  }
  //console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error al verificar el token JWT:", err);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    //si el token es valido se continua con el siguiente medoto del router, por ejemplo post order
    next(); // Llama a la siguiente función de middleware

    //no apliqué los cambios a la ruta de producst
  });
};
module.exports = {
  authenticateUser,
  verifyToken,
};
