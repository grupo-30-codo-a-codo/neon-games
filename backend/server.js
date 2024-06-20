const errorHandler = require('./middlewares/errorHandler')
const productsRouter = require('./routes/products-router')
const categoriesRouter = require('./routes/categories-router')
const ordersRouter = require('./routes/orders-router');
const orderDetailRouter = require("./routes/orderDetail-router");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', productsRouter);
app.use('/api', categoriesRouter);
app.use('/api', ordersRouter);
app.use("/api", orderDetailRouter);

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
