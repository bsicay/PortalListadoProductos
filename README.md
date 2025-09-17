# Portal Listado Productos - Full Stack

Un portal completo para listar y gestionar productos construido con React (frontend) y Node.js/Express (backend) con base de datos MySQL.

## 🏗️ Arquitectura del Proyecto

```
PortalListadoProductos/
├── client/                 # Frontend React con Vite
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Funciones utilitarias
│   │   └── assets/        # Recursos estáticos
│   └── package.json
├── server/                 # Backend Node.js/Express
│   ├── src/
│   │   ├── controllers/   # Controladores de la API
│   │   ├── models/        # Modelos de datos
│   │   ├── routes/        # Rutas de la API
│   │   ├── middleware/    # Middlewares personalizados
│   │   ├── config/        # Configuración (DB, etc.)
│   │   └── utils/         # Utilidades del servidor
│   └── package.json
├── database/              # Scripts de base de datos
│   └── schema.sql         # Esquema de la base de datos
└── docs/                  # Documentación adicional
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **Vite 5.2.0** - Herramienta de construcción rápida
- **CSS3** - Estilos modernos y responsivos

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MySQL** - Base de datos relacional
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **express-validator** - Validación de datos

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- MySQL (v8.0 o superior)
- MySQL Workbench (opcional, para gestión visual)

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd PortalListadoProductos
```

### 2. Instalar dependencias
```bash
# Instalar todas las dependencias (root, server y client)
npm run install:all
```

### 3. Configurar la base de datos

#### Opción A: Usando MySQL Workbench
1. Abrir MySQL Workbench
2. Ejecutar el script `database/schema.sql`
3. Crear la base de datos `portal_productos`

#### Opción B: Usando línea de comandos
```bash
mysql -u root -p < database/schema.sql
```

### 4. Configurar variables de entorno

#### Backend (server/env.example → server/.env)
```env
# Configuración del servidor
PORT=5000
NODE_ENV=development

# Configuración de la base de datos MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=portal_productos
DB_USER=root
DB_PASSWORD=tu_password_aqui

# JWT Secret
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
JWT_EXPIRE=7d

# URL del cliente
CLIENT_URL=http://localhost:3000
```

## 🚀 Comandos Disponibles

### Desarrollo
```bash
# Ejecutar frontend y backend simultáneamente
npm run dev

# Solo backend
npm run server:dev

# Solo frontend
npm run client:dev
```

### Producción
```bash
# Construir ambos proyectos
npm run build

# Iniciar servidor de producción
npm start
```

### Instalación
```bash
# Instalar todas las dependencias
npm run install:all
```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/products` - Listar productos (con filtros)
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Usuarios
- `GET /api/users` - Listar usuarios (Admin)
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario (Admin)

### Health Check
- `GET /api/health` - Estado del servidor

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

1. **Registro/Login**: Obtén un token JWT
2. **Requests autenticados**: Incluye el token en el header:
   ```
   Authorization: Bearer <tu_token>
   ```

## 🎯 Características Implementadas

### Frontend
- ✅ Diseño responsivo y moderno
- ✅ Componentes reutilizables
- ✅ Navegación intuitiva
- ✅ Estilos con gradientes y animaciones

### Backend
- ✅ API REST completa
- ✅ Autenticación JWT
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ Paginación
- ✅ Filtros y búsqueda
- ✅ Middleware de seguridad

### Base de Datos
- ✅ Esquema normalizado
- ✅ Relaciones entre tablas
- ✅ Índices para rendimiento
- ✅ Datos de ejemplo

## 🔧 Configuración de Desarrollo

### Puertos
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

### Estructura de Base de Datos
- **users**: Usuarios del sistema
- **categories**: Categorías de productos
- **products**: Productos del catálogo
- **reviews**: Reseñas de productos

## 📝 Próximos Pasos

- [ ] Implementar subida de imágenes
- [ ] Agregar sistema de reviews
- [ ] Implementar carrito de compras
- [ ] Agregar tests unitarios
- [ ] Configurar CI/CD
- [ ] Implementar caché con Redis
- [ ] Agregar documentación con Swagger

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.