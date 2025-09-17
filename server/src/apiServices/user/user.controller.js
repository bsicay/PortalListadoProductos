import { multiple, single } from './user.dto.js';
import {
  createUser,
  getUser,
} from './user.model.js';
import CustomError from '../../utils/customError.js';
import consts from '../../utils/consts.js';


const createUserController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await createUser({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: single(user, { showSensitiveData: false })
    });
  } catch (ex) {
    console.error('Error creando usuario:', ex);
    
    if (ex.message.includes('email ya se encuentra registrado')) {
      return res.status(400).json({ 
        message: 'El email ya se encuentra registrado' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor al crear usuario' 
    });
  }
};




const getUserController = async (req, res) => {
  try {
    const { idUser } = req.params;
    
    if (!idUser) {
      return res.status(400).json({ 
        message: 'ID de usuario requerido' 
      });
    }

    const user = await getUser({ idUser, showSensitiveData: true });
    
    if (!user) {
      return res.status(404).json({ 
        message: 'El usuario indicado no existe' 
      });
    }

    // Filtrar datos privados si no es admin
    let showSensitiveData = user.id === req.session?.id;
    if (!showSensitiveData && req.session?.role === consts.roles.admin) {
      showSensitiveData = true;
    }

    res.status(200).json(single(user, { showSensitiveData }));
  } catch (ex) {
    console.error('Error obteniendo usuario:', ex);
    
    if (ex.message.includes('Error al obtener la información del usuario')) {
      return res.status(500).json({ 
        message: 'Error interno del servidor al obtener información del usuario' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor' 
    });
  }
};

export {
  createUserController,
  getUserController,
};
