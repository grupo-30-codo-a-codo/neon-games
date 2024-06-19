const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const dbConnection = require("./config/dbConfig");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Buenas team! Probando");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
