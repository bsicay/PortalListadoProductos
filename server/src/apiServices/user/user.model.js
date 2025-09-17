
import CustomError from '../../utils/customError.js';
import { single } from './user.dto.js';
import { query } from '../../db/connection.js';
import bcrypt from 'bcryptjs';





const createUser = async ({
  name,
  email,
  password,
  role = 'colaborador',
}) => {
  try {
    // Verificar si el email ya existe
    const existingUsers = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      throw new Error('El email ya se encuentra registrado.');
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const result = await query(`
      INSERT INTO users (name, email, password, role, is_active)
      VALUES (?, ?, ?, ?, ?)
    `, [name.trim(), email.trim(), hashedPassword, role, true]);

    // Obtener el usuario creado
    const newUsers = await query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    
    if (newUsers.length === 0) {
      throw new Error('Error al crear el usuario.');
    }

    return single(newUsers[0], { showSensitiveData: true });
  } catch (ex) {
    if (ex.message.includes('email ya se encuentra registrado')) {
      throw new Error('El email ya se encuentra registrado.');
    }
    if (ex.code === 'ER_DUP_ENTRY') {
      throw new Error('El email ya se encuentra registrado.');
    }
    throw ex;
  }
};


const getUser = async ({ idUser, showSensitiveData = false }) => {
  try {
    const result = await query('SELECT * FROM users WHERE id = ? AND is_active = 1', [idUser]);
    
    if (result.length === 0) {
      return null;
    }

    return single(result[0], { showSensitiveData });
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw new Error('Error al obtener la información del usuario');
  }
};

export {
  createUser,
  getUser,
};
