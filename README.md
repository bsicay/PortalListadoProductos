
# Portal de Listado de Productos

 
Un sistema full-stack para la gestión de productos con autenticación basada en roles, desarrollado con React, Node.js, Express y MySQL.


##  Tabla de Contenidos

  

- [Descripción del Proyecto](#-descripción-del-proyecto)

- [Características](#-características)

- [Tecnologías Utilizadas](#-tecnologías-utilizadas)

- [Estructura del Proyecto](#-estructura-del-proyecto)

- [Configuración del Entorno](#-configuración-del-entorno)

- [Instalación](#-instalación)

- [Uso](#-uso)

- [API Endpoints](#-api-endpoints)

- [Autenticación y Roles](#-autenticación-y-roles)

- [Capturas de Pantalla](#-capturas-de-pantalla)

- [Mejoras Futuras](#-mejoras-futuras)

- [Contribución](#-contribución)

  

## Descripción del Proyecto

  

Portal de Listado de Productos es una aplicación web que permite gestionar un catálogo de productos con diferentes niveles de acceso según el rol del usuario. El sistema implementa autenticación JWT y control de acceso basado en roles para proporcionar una experiencia segura y personalizada.

  

### Funcionalidades Principales:

-  **Visualización pública** de productos sin autenticación

-  **Autenticación segura** con JWT (JSON Web Tokens)

-  **Control de acceso basado en roles** (Administrador y Colaborador)

-  **CRUD completo** de productos con validaciones

-  **Interfaz responsive** 

-  **Gestión de sesiones** con tokens de acceso y refresh

  

## Características

  

### Autenticación y Autorización

-  **JWT Tokens**: Generación y validación de tokens de acceso y refresh

-  **Roles de Usuario**: Administrador y Colaborador con permisos diferenciados

-  **Sesiones Seguras**: Manejo de sesiones con expiración automática

-  **Middleware de Autenticación**: Protección de rutas sensibles

  

### Gestión de Productos

-  **Listado Público**: Visualización de productos sin autenticación

-  **Creación**: Formulario modal para agregar nuevos productos

-  **Actualización**: Edición de productos existentes

-  **Eliminación**: Borrado seguro con confirmación (solo administradores)

-  **Validaciones**: Campos obligatorios y tipos de datos

  

### Interfaz de Usuario

-  **Diseño Responsive**: Adaptable a diferentes dispositivos

-  **Modales Interactivos**: Para login, creación y edición

-  **Confirmaciones**: Diálogos de confirmación para acciones críticas

-  **Estados de Carga**: Indicadores visuales durante operaciones

-  **Manejo de Errores**: Mensajes informativos para el usuario

  

## Tecnologías Utilizadas

  

### Frontend

-  **React 18** - Biblioteca de interfaz de usuario

-  **Vite** - Herramienta de construcción y desarrollo

-  **React Router** - Enrutamiento del lado del cliente

-  **Tailwind CSS** - Framework de CSS utilitario

-  **Heroicons** - Iconografía

-  **CSS Modules** - Estilos encapsulados por componente

  

### Backend

-  **Node.js** - Entorno de ejecución de JavaScript

-  **Express.js** - Framework web para Node.js

-  **MySQL** - Base de datos relacional

-  **JWT** - Autenticación basada en tokens

-  **Bcryptjs** - Encriptación de contraseñas

-  **Yup** - Validación de esquemas

  

### Base de Datos

-  **MySQL** - Sistema de gestión de base de datos

-  **mysql2/promise** - Cliente MySQL para Node.js

  


  

## Configuración del Entorno

  

### Variables de Entorno

  

Crea un archivo `.env` en la carpeta `server/` con las siguientes variables:

  

```env

# Base de Datos

DB_HOST=localhost

DB_USER=tu_usuario_mysql

DB_PASSWORD=tu_contraseña_mysql

DB_NAME=portal_productos

  

# JWT Secret (Genera uno seguro en https://jwtsecrets.com/#generator)

JWT_SECRET=tu_jwt_secret_muy_seguro_aqui

  

# Servidor

PORT=3001

NODE_ENV=development

  

# CORS

CLIENT_URL=http://localhost:5173

AVOID_CORS=true

```

  

### Generación de JWT Secret

  

Para generar un JWT secret seguro, visita: [https://jwtsecrets.com/#generator](https://jwtsecrets.com/#generator)

  

**Ejemplo de JWT Secret:**

```

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

  

##  Instalación

  

### Prerrequisitos

  

-  **Node.js** (versión 16 o superior)

-  **MySQL** (versión 8.0 o superior)

-  **npm** o **yarn**

  

### Pasos de Instalación

  

1.  **Clona el repositorio:**

```bash

git  clone  https://github.com/tu-usuario/PortalListadoProductos.git

cd  PortalListadoProductos

```

  

2.  **Instala las dependencias del proyecto raíz:**

```bash

npm  install

```

  

3.  **Instala las dependencias del frontend:**

```bash

cd  client

npm  install

cd  ..

```

  

4.  **Instala las dependencias del backend:**

```bash

cd  server

npm  install

cd  ..

```

  

5.  **Configura la base de datos:**

```bash

# Crea la base de datos en MySQL

mysql  -u  root  -p

CREATE  DATABASE  portal_productos;

```

  

6.  **Ejecuta el esquema de la base de datos:**

```bash

mysql  -u  root  -p  portal_productos  <  database/schema.sql

```

  

  

8.  **Inicia la aplicación:**

```bash

# Desde la raíz del proyecto

npm  run  dev

```

  

Esto iniciará tanto el frontend (puerto 5173) como el backend (puerto 3001) simultáneamente.

  

##  Uso

  

### Acceso a la Aplicación

  

-  **Frontend**: http://localhost:5173

-  **Backend API**: http://localhost:3001

  

### Usuarios de Prueba

  

La base de datos incluye usuarios de prueba:

  

**Administrador:**

- Email: `admin@example.com`

- Contraseña: `password`

  

**Colaborador:**

- Email: `colaborador@example.com`

- Contraseña: `password`

  
  

> NOTA: Se dejó la creación de usuarios en base de datos directamente. En el portal solamente se puede iniciar sesión. Esto por definición de quién podría crear un usuario admin.

### Funcionalidades por Rol

  

#### Usuario No Autenticado

- Visualizar lista de productos públicos
  

####  Colaborador

- Todas las funcionalidades de usuario no autenticado

- Crear nuevos productos

- Actualizar productos existentes

  

#### Administrador

- Todas las funcionalidades de colaborador

- Eliminar productos

- Gestión completa del sistema

  

## API Endpoints


### Autenticación

```

POST /api/session/login # Iniciar sesión

POST /api/session/logout # Cerrar sesión

GET /api/session/accessToken # Obtener token de acceso

```

  

### Productos

```

GET /api/products/public # Listar productos públicos

GET /api/products # Listar productos (autenticado)

POST /api/products # Crear producto (colaborador+)

PUT /api/products/:id # Actualizar producto (colaborador+)

DELETE /api/products/:id # Eliminar producto (admin)

```

  

### Usuarios

```

POST /api/users # Crear usuario (admin)

GET /api/users/:id # Obtener usuario (autenticado)

GET /api/users/me # Obtener usuario actual

```

  

##  Autenticación y Roles

  

### Sistema de Tokens JWT

  

El sistema utiliza **JSON Web Tokens (JWT)** para la autenticación:

  

-  **Access Token**: Token de corta duración para autenticación

-  **Refresh Token**: Token de larga duración para renovar access tokens

-  **Expiración**: Los tokens tienen tiempo de vida limitado por seguridad

 
  

### Middleware de Autenticación

  

-  **`ensureRefreshTokenAuth`**: Valida tokens de refresh

-  **`ensureAdminAuth`**: Solo administradores

-  **`ensureCollaboratorAuth`**: Colaboradores y administradores

  

## Capturas de Pantalla

| Listado público de productos | Login | Portal de admin |
|------------------------------|-------|-----------------|
| <img width="400" alt="Listado público de productos" src="https://github.com/user-attachments/assets/c3fedf8f-c5a7-459a-8763-8216719c2164" /> | <img width="400" alt="Login" src="https://github.com/user-attachments/assets/ca125ada-df8e-4b9b-9137-a68f94bef35b" /> | <img width="400" alt="Portal de admin" src="https://github.com/user-attachments/assets/298f6787-7646-4f04-8775-f149bb7e3249" /> |

| Actualizar un producto | Eliminar un producto | Vista de colaborador |
|------------------------|----------------------|----------------------|
| <img width="400" alt="Actualizar un producto" src="https://github.com/user-attachments/assets/f4e01875-bc79-4432-8e30-8099a970298e" /> | <img width="400" alt="Eliminar un producto" src="https://github.com/user-attachments/assets/1320eebe-dacc-4dbc-84ed-c3b2ecb70371" /> | <img width="400" alt="Vista de colaborador" src="https://github.com/user-attachments/assets/fce978a1-f9c4-4a20-b2a2-adbf161966c3" /> |

| Crear un producto | |  |
|------------------------|----------------------|----------------------|
| <img width="400" alt="Crear un producto" src="https://github.com/user-attachments/assets/db84a171-c228-45af-a00a-3129139c5e99" /> |  |



## Mejoras Futuras

  

### Funcionalidades Planificadas

  

-  **Gestión de Imágenes**: Implementación de AWS S3 o similar para almacenamiento de imágenes

-  **Búsqueda Avanzada**: Filtros por categoría, precio, disponibilidad

-  ** Internacionalización**: Soporte para múltiples idiomas

-  **Paginación**: Manejo eficiente de grandes cantidades de productos

-  **Cache**: Implementación de Redis para mejorar rendimiento


  

## Autor

  
- Email: sicayb@gmail.com

  

