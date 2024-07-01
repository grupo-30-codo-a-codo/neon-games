const Users = require("../config/dbConfig");
const bcrypt = require("bcryptjs");

/*Resumen del archivo, por si se hace largo */

//getAllUsers, deprecated ja
//getUserById id viene por params
//getUserByValues, por ejemplo email o id  pero por data en el body...
// post registerUser
// post logIn
// put updateUserbyId
// delete deleteUserById

const getAllUsers = async (req, res) => {
  //para para hacer mas limpio el codigo

  const sql = "SELECT * FROM users";

  try {
    //no utilizamos async/await ya que no se aguarda una response fuera, sino que se maneja dentro del query callback
    Users.query(sql, (error, result) => {
      //si error viene con en info es true, entra en el if
      if (error) {
        // lo agarro en el cath y lo devuelvo al front con un mensaje, o bien mando una res.....
        throw error;
      }

      if (result.length > 0) {
        //armo una response con data del user menos el pass, podría no ir el email tambien
        let myResponse = [];
        result.map((user, index) => {
          myResponse[index] = {
            username: user.name,
            id: user.id_user,
            email: user.email,
          };
        });
        return res.status(200).send(myResponse);
      }
      //si aun no hay usuarios devuelvo un mensaje
      return res
        .status(200)
        .send({ message: "No existen usuarios registrados" });
    });
  } catch (error) {
    return res.status(500).send({
      message: "Algo salió mal al obtener los usuarios",
      error: error,
    });
  }
};

const getUserById = (req, res) => {
  try {
    //el id se envia en la url como parametro, y viene en el objeto req de request que hace el client
    const id = req.params.id;
    //console.log(id)
    //si no viene el id
    if (!id) {
      return res
        .status(400)
        .send({ message: "No se proporcionó el ID del usuario" });
    }

    // Realizar la consulta SQL para obtener el usuario por su ID
    const sql = "SELECT * FROM users WHERE id_user = ?";
    Users.query(sql, [id], (error, results) => {
      if (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).send({ message: "Error al buscar el usuario" });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .send({ message: "No existe un usuario con ese ID" });
      }
      //dato: solo espero encontrar un usuario con ese id, en el indice 0 del array
      // Si se encontró el usuario, enviarlo en la respuesta

      const data = {
        id_user: results[0].id_user,
        nombre: results[0].name,
        email: results[0].email,
      };
      res.status(200).send({ message: "Usuario encontrado", data: data });
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    return res
      .status(500)
      .send({ message: "Algo salió mal en el servidor", error: error });
  }
};
//#region

// // completo getUserByAnyValue y dejo comentado.
// const getUserByAnyValue = (req, res) => {
//   const { name, id_user, email } = req.body;

//   // Variables para construir la consulta SQL
//   let sql = "SELECT * FROM users WHERE ";
//   let conditions = [];
//   let values = [];

//   // acá agrego condiciones basadas en los valores proporcionados
//   if (name) {
//     conditions.push("name = ?");
//     values.push(name);
//   }
//   if (id_user) {
//     conditions.push("id_user = ?");
//     values.push(id_user);
//   }
//   if (email) {
//     conditions.push("email = ?");
//     values.push(email);
//   }

//   // si no se proporciona ningún valor de búsqueda, va a retornar un error
//   if (conditions.length === 0) {
//     return res
//       .status(400)
//       .send({ message: "No se proporcionó un valor de búsqueda" });
//   }

//   // uniendo la consulta SQL con las condiciones mediante OR
//   sql += conditions.join(" OR ");

//   // para ejecutar la consulta SQL
//   Users.query(sql, values, (error, results) => {
//     if (error) {
//       console.error("Error al buscar usuario:", error);
//       return res
//         .status(500)
//         .send({ message: "Error al buscar usuario", error: error });
//     }

//     if (results.length === 0) {
//       return res.status(404).send({
//         message: "No se encontraron usuarios con los valores proporcionados",
//       });
//     }

//     res.status(200).send({ message: "Usuarios encontrados", data: results });
//   });
// };
//#endregion
//post
const registerUser = (req, res) => {
  try {
    //se obtienen desestructurando los valores para las variables name email... del objeto req.body

    /*
    req.body llega asi {
    name:valor del front, email:...
    }
    
    
    */
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Se requieren name, email y password para continuar",
      });
    }

    //validar que el email tenga la estructura de un email ej: abc@dominio.com
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(emailRegex)) {
      return res.status(500).send({ message: "Eso no parece un email" });
    }

    // Verificar si el usuario ya existe por su email
    //si se intenta hacer el insert sin verificar la base tira un error ya que el email es unique, pero es
    //mejor controlarlo nosotros samu
    const sqlCheck = "SELECT * FROM users WHERE email = ?";
    Users.query(sqlCheck, [email], (error, results) => {
      if (error) {
        console.error("Error al verificar usuario por email:", error);
        return res.status(500).json({ message: "Error al crear usuario" });
      }

      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: "El email ya está registrado para un usuario" });
      }

      //si no existe el email en la base seguimos....

      //logica para encryptar el password antes de salvarlo en la base

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ message: "Error al encriptar la pass", error: error });
        }
        //arma el objeto, es lo mismo que {name:name,email:email....}
        const newUser = { name, email, password: hashedPassword };

        const sql = "INSERT INTO users SET ?";

        Users.query(sql, newUser, (error, results) => {
          if (error) {
            console.error("Error al crear usuario:", error);
            return res
              .status(500)
              .send({ message: "Error al crear usuario", error: error });
          }

          // console.log("Usuario creado correctamente:", results.insertId);
          //el result no devuelve la info que inserto, pero si el id del user
          res.status(201).json({
            message: "Usuario creado exitosamente",
            userId: results.insertId,
          });
        });
      });
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    return res
      .status(500)
      .send({ message: "Algo salió mal en el servidor", error: error });
  }
};

const logIn = (req, res) => {
  const { id_user, email } = req.user;
  const token = req.token;
  try {
    //armo la response con... por ejemplo las config del user que en este caso no hay nada hecho de eso
    //y devuelvo el token y la info del user para guardar en localstore
    const userData = { id_user: id_user, email: email, token }; //token ya viene del authHandler como {token: biribiri}
    return res
      .status(200)
      .send({ message: "Sesión iniciada con éxito", userData: userData });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error de autenticación", error: error });
  }
};

// actualizar un usuario por id
const updateUserById = (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;

    if (!id || (!name && !email && !password)) {
      return res.status(400).send({
        message:
          "ID y al menos un valor (name, email o password) son necesarios",
      });
    }

    let sql = "UPDATE users SET ";
    let updates = [];
    let values = [];

    if (name) {
      updates.push("name = ?");
      values.push(name);
    }
    if (email) {
      updates.push("email = ?");

      values.push(email);
    }
    if (password) {
      updates.push("password = ?");
      values.push(password);
    }

    sql += updates.join(", ") + " WHERE id_user = ?";
    values.push(id);

    /* En caso de que el update se del EMAIL ya que es unique, antes de actualizarlo tendriamos que
    comprobar que no existe el email en la db, y verificar que sea un email correcto */

    Users.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error al actualizar usuario:", error);
        return res
          .status(500)
          .send({ message: "Error al actualizar usuario", error: error });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .send({ message: "No existe un usuario con ese ID" });
      }

      res.status(200).send({ message: "Usuario actualizado exitosamente" });
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    return res
      .status(500)
      .send({ message: "Algo salió mal en el servidor", error: error });
  }
};

// eliminar un usuario por id
const deleteUserById = (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .send({ message: "No se proporcionó el ID del usuario" });
    }

    const sql = "DELETE FROM users WHERE id_user = ?";
    Users.query(sql, [id], (error, results) => {
      if (error) {
        console.error("Error al eliminar usuario:", error);
        return res
          .status(500)
          .send({ message: "Error al eliminar usuario", error: error });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .send({ message: "No existe un usuario con ese ID" });
      }

      res.status(200).send({ message: "Usuario eliminado exitosamente" });
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    return res
      .status(500)
      .send({ message: "Algo salió mal en el servidor", error: error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUserById,
  deleteUserById,
  logIn,
};
