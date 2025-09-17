import bcrypt from 'bcryptjs';
import moment from 'moment';
import config from 'config';
import {
  authenticate,
  deleteLinkedTokens,
  deleteSessionToken,
  storeSessionToken,
} from './session.model.js';
import { signAccessToken, signRefreshToken } from '../../services/jwt.js';
import { getUser } from '../user/user.model.js';
import consts from '../../utils/consts.js';
import CustomError from '../../utils/customError.js';

const allowInsecureConnections = config.get('allowInsecureConnections');

const saveRefreshTokenInCookies = (res, token) => {
  res.cookie('refreshToken', token, {
    secure: !allowInsecureConnections,
    httpOnly: true,
    expires: moment().add(1, 'weeks').toDate(),
  });
};

const createRefreshToken = async ({
  id,
  name,
  email,
  role,
}) => {
  const refreshToken = await signRefreshToken({
    id,
    name,
    email,
    role,
  });

  // guardar refresh token en bd
  await storeSessionToken({
    idUser: id, 
    token: refreshToken, 
    tokenType: consts.token.refresh,
  });

  return refreshToken;
};

const createAccessToken = async ({
  id,
  name,
  email,
  role,
  refreshToken,
}) => {
  const accessToken = await signAccessToken({
    id,
    name,
    email,
    role,
  });

  // almacenar access token en bd
  await storeSessionToken({
    idUser: id,
    token: accessToken,
    tokenType: consts.token.access,
    linkedToken: refreshToken,
  });

  return accessToken;
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Autenticar usuario
    const user = await authenticate(email, password);

    const refreshToken = await createRefreshToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // almacenar token en cookies
    saveRefreshTokenInCookies(res, refreshToken);

    const accessToken = await createAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      refreshToken,
    });

    res.status(200).json({ 
      message: 'Login exitoso',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (ex) {
    console.error('Error en login:', ex);
    
    if (ex.message.includes('Usuario o contraseña incorrectos')) {
      return res.status(400).json({ 
        message: 'Usuario o contraseña incorrectos' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor al iniciar sesión' 
    });
  }
};

const refreshAccessTokenController = async (req, res) => {
  try {
    let userData = req.session;
    let { refreshToken } = req.cookies;

    // Verificar si el refresh token debe ser actualizado
    if (req.session.update) {
      // Eliminar tokens anteriores
      await deleteSessionToken(refreshToken);
      await deleteLinkedTokens(refreshToken);

      // Obtener usuario actualizado
      userData = await getUser({ idUser: userData.id, showSensitiveData: true });
      if (!userData) throw new CustomError('El usuario proporcionado no existe.', 404);

      refreshToken = await createRefreshToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });

      saveRefreshTokenInCookies(res, refreshToken);
    }

    const accessToken = await createAccessToken({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      refreshToken,
    });

    res.status(200).json({ 
      accessToken,
      refreshToken: req.session.update ? refreshToken : undefined
    });
  } catch (ex) {
    console.error('Error refrescando access token:', ex);
    
    if (ex.message.includes('El usuario proporcionado no existe')) {
      return res.status(404).json({ 
        message: 'El usuario proporcionado no existe' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor al refrescar token' 
    });
  }
};

const logoutController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // Eliminar token de bd y cookie
    res.clearCookie('refreshToken');
    await deleteSessionToken(refreshToken);

    // eliminar access tokens vinculados
    await deleteLinkedTokens(refreshToken);

    res.status(200).json({ message: 'Logout exitoso' });
  } catch (ex) {
    console.error('Error en logout:', ex);
    res.status(500).json({ 
      message: 'Error interno del servidor al cerrar sesión' 
    });
  }
};

export { loginController, refreshAccessTokenController, logoutController };
