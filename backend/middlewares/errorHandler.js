const errorHandler = (err, req, res, next) => {
  let statusResponse = res.status(err.status || 500);
  statusResponse.json(
    { error: err.message } || `Error en el servidor: ${err.status}`
  );
};

module.exports = errorHandler;
