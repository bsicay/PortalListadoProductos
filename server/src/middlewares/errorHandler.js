const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  console.error(err);

  // Error de MySQL
  if (err.code === 'ER_DUP_ENTRY') {
    const message = 'Recurso duplicado';
    error = { message, statusCode: 400 };
  }

  // Error de validación MySQL
  if (err.code === 'ER_BAD_NULL_ERROR') {
    const message = 'Campo requerido faltante';
    error = { message, statusCode: 400 };
  }

  // Error de conexión a la base de datos
  if (err.code === 'ECONNREFUSED') {
    const message = 'Error de conexión a la base de datos';
    error = { message, statusCode: 500 };
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token inválido';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expirado';
    error = { message, statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
