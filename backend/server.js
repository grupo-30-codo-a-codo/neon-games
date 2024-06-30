const errorHandler = require("./middlewares/errorHandler");
const productsRouter = require("./routes/products-router");
const categoriesRouter = require("./routes/categories-router");
const ordersRouter = require("./routes/orders-router");
const orderDetailRouter = require("./routes/orderDetail-router");
const usersRouter = require("./routes/users-router");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

app.use('/api', productsRouter);
app.use('/api', categoriesRouter);
app.use('/api', ordersRouter);
app.use("/api", orderDetailRouter);
app.use("/api", usersRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
