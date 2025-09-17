
import moment from 'moment';
import bcrypt from 'bcryptjs';
import { query } from '../../db/connection.js';
import CustomError from '../../utils/customError.js';
import consts from '../../utils/consts.js';
import { single } from './session.dto.js';

const storeSessionToken = async ({
  idUser, token, tokenType, linkedToken,
}) => {
  try {
    const result = await query(`
      INSERT INTO user_sessions (idUser, token, tokenType, linkedToken, date, expires_at)
      VALUES (?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? HOUR))
    `, [
      idUser, 
      token, 
      tokenType, 
      linkedToken || null, // Convertir undefined a null
      tokenType === consts.token.access ? consts.tokenExpiration.access_hours_expiration : consts.tokenExpiration.refresh_days_expiration * 24
    ]);
    
    return result.insertId;
  } catch (error) {
    console.error('Error almacenando session token:', error);
    throw new CustomError('No fue posible almacenar el token de sesión.', 500);
  }
};

const deleteSessionToken = async (token) => {
  try {
    const result = await query('DELETE FROM user_sessions WHERE token = ?', [token]);
    
    if (result.affectedRows !== 1) { 
      throw new CustomError('No fue posible eliminar el refresh token.', 500); 
    }
  } catch (error) {
    console.error('Error eliminando session token:', error);
    throw new CustomError('No fue posible eliminar el refresh token.', 500);
  }
};

const deleteLinkedTokens = async (linkedToken) => {
  try {
    const result = await query('DELETE FROM user_sessions WHERE linkedToken = ?', [linkedToken]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error eliminando tokens vinculados:', error);
    throw new CustomError('No fue posible eliminar los tokens vinculados.', 500);
  }
};

/**
 * Permite validar un session token.
 * @param {string} idUser
 * @param {string} token
 * @returns Boolean. Indica si el token requiere ser actualizado.
 */
const validateSessionToken = async (idUser, token) => {
  try {
    const result = await query(
      'SELECT * FROM user_sessions WHERE idUser = ? AND token = ? AND (expires_at IS NULL OR expires_at > NOW())', 
      [idUser, token]
    );
  
    if (result.length === 0) {
      throw new CustomError('Session token inválido.', 401);
    }
    
    return result[0].needUpdate;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    console.error('Error validando session token:', error);
    throw new CustomError('Session token inválido.', 401);
  }
};

const authenticate = async (email, password) => {
  try {
    const result = await query(
      'SELECT * FROM users WHERE email = ? AND is_active = 1', 
      [email]
    );

    if (result.length === 0) {
      throw new CustomError('Usuario o contraseña incorrectos.', 400);
    }
    
    const user = result[0];
    
    // Verificar contraseña con bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new CustomError('Usuario o contraseña incorrectos.', 400);
    }
    
    return single(user);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    console.error('Error en autenticación:', error);
    throw new CustomError('Usuario o contraseña incorrectos.', 400);
  }
};

const forceUserLogout = async (idUser) => {
  try {
    const result = await query('DELETE FROM user_sessions WHERE idUser = ?', [idUser]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error forzando logout:', error);
    throw new CustomError('No fue posible cerrar la sesión.', 500);
  }
};

const deleteAccessTokens = async ({ idUser }) => {
  try {
    const result = await query(
      'DELETE FROM user_sessions WHERE idUser = ? AND tokenType = ?', 
      [idUser, consts.token.access]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error eliminando access tokens:', error);
    throw new CustomError('No fue posible eliminar los tokens de acceso.', 500);
  }
};

/**
 * Este método marca los refresh tokens de un usuario, de manera que estos deben ser actualizados
 * con los datos del usuario. También, los access tokens del usuario son eliminados.
 * @param {string} idUser id del usuario.
 */
const forceSessionTokenToUpdate = async ({ idUser }) => {
  try {
    await query(
      'UPDATE user_sessions SET needUpdate = 1 WHERE idUser = ? AND tokenType = ?', 
      [idUser, consts.token.refresh]
    );
    await deleteAccessTokens({ idUser });
  } catch (error) {
    console.error('Error forzando actualización de tokens:', error);
    throw new CustomError('No fue posible actualizar los tokens.', 500);
  }
};

/**
 * Elimina todos los session tokens de un usuario
 * @param {string} idUser id del usuario.
 */
const deleteAllUserSessionTokens = async ({ idUser }) => {
  try {
    const result = await query('DELETE FROM user_sessions WHERE idUser = ?', [idUser]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error eliminando todos los tokens del usuario:', error);
    throw new CustomError('No fue posible eliminar los tokens del usuario.', 500);
  }
};

/**
 * Función que se encarga de eliminar todos los session tokens de más de un día de antiguedad.
 */
const deleteExpiredSessionTokens = async () => {
  try {
    const accessExpiration = moment().subtract(consts.tokenExpiration.access_hours_expiration, 'hour').format('YYYY-MM-DD HH:mm:ss');
    const refreshExpiration = moment().subtract(consts.tokenExpiration.refresh_days_expiration, 'day').format('YYYY-MM-DD HH:mm:ss');

    await query('DELETE FROM user_sessions WHERE date < ? AND tokenType = ?', [accessExpiration, consts.token.access]);
    await query('DELETE FROM user_sessions WHERE date < ? AND tokenType = ?', [refreshExpiration, consts.token.refresh]);
  } catch (error) {
    console.error('Error eliminando tokens expirados:', error);
  }
};

export {
  storeSessionToken,
  deleteSessionToken,
  authenticate,
  validateSessionToken,
  deleteLinkedTokens,
  forceUserLogout,
  forceSessionTokenToUpdate,
  deleteAccessTokens,
  deleteAllUserSessionTokens,
  deleteExpiredSessionTokens,
};