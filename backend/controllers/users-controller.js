const Users = require("../config/dbConfig");

/*Resumen del archivo, por si se hace largo */

//getAllUsers, deprecated ja
//getUserById id viene por params
//getUserByValues, por ejemplo email o id  pero por data en el body...

const getAllUsers = async (req, res) => {
  //para para hacer mas limpio el codigo

  const sql = "SELECT * FROM Users";

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
        result.map((user) => {
          myResponse = {
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
    const sql = "SELECT * FROM Users WHERE id_user = ?";
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

const getUserByAnyValue = (req, res) => {
  const { name, id_user, email } = req.body;
  //continuará...
};

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

    // Verificar si el usuario ya existe por su email
    //si se intenta hacer el insert sin verificar la base tira un error ya que el email es unique, pero es
    //mejor controlarlo nosotros samu
    const sqlCheck = "SELECT * FROM Users WHERE email = ?";
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

      /*

                logica para encryptar el password antes de salvarlo en la base


    */
      //arma el objeto, es lo mismo que {name:name,email:email....}
      const newUser = { name, email, password };

      const sql = "INSERT INTO Users SET ?";

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
  } catch (error) {}
};

module.exports = { getAllUsers, getUserById, getUserByAnyValue, registerUser };
