/* eslint-disable no-console */
import mysql from 'mysql2/promise';
import config from 'config';

// Configuración de la conexión a MySQL
const dbConfig = {
  host: config.get('dbHost'),
  port: config.get('dbPort'),
  user: config.get('dbUser'),
  password: config.get('dbPassword'),
  database: config.get('dbDatabase'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Crear pool de conexiones
let pool = null;

const connect = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool(dbConfig);
    }
    
    // Probar la conexión
    const connection = await pool.getConnection();
    console.info('Conexión a la bd exitosa.');
    connection.release();
    
    return pool;
  } catch (error) {
    console.error('Error conectando a MySQL:', error.message);
    throw error;
  }
};

// Función para obtener una conexión del pool
const getConnection = async () => {
  if (!pool) {
    await connect();
  }
  return await pool.getConnection();
};

// Función para ejecutar queries
const query = async (sql, params = []) => {
  try {
    if (!pool) {
      await connect();
    }
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Error ejecutando query:', error.message);
    throw error;
  }
};

// Función para cerrar el pool de conexiones
const closePool = async () => {
  try {
    if (pool) {
      await pool.end();
      pool = null;
      console.info('Pool de conexiones MySQL cerrado');
    }
  } catch (error) {
    console.error('Error cerrando pool:', error.message);
  }
};

// Función para verificar el estado de la conexión
const isConnected = async () => {
  try {
    if (!pool) return false;
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    return false;
  }
};

export default connect;
export { 
  connect, 
  getConnection, 
  query, 
  closePool, 
  isConnected,
  pool 
};
