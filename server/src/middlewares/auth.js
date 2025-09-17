import jwt from 'jsonwebtoken';
import config from 'config';
import { query } from '../db/connection.js';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token de acceso requerido' });
    }

    // Verificar token en BD
    const sessions = await query(
      'SELECT u.* FROM user_sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > NOW() AND u.is_active = 1',
      [token]
    );

    if (sessions.length === 0) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    const user = sessions[0];
    
    // Agregar información del usuario al request
    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export default auth;