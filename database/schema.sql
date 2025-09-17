-- Base de datos para Portal de Productos
-- Prueba Técnica Desarrollo Web

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS portal_productos;
USE portal_productos;

-- Tabla de usuarios (para login y roles)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('administrador', 'colaborador') NOT NULL DEFAULT 'colaborador',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    inventory INT NOT NULL DEFAULT 0,
    image VARCHAR(255),
    created_by INT,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Tabla de sesiones (para control de login)
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    token VARCHAR(500) NOT NULL,
    tokenType VARCHAR(50) NOT NULL,
    linkedToken VARCHAR(500),
    needUpdate BOOLEAN DEFAULT FALSE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE
);

-- Insertar usuarios de prueba
INSERT INTO users (name, email, password, role) VALUES 
('Administrador', 'admin@portal.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'administrador'),
('Colaborador', 'colaborador@portal.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'colaborador');

-- Insertar productos de prueba (con inventario > 5)
INSERT INTO products (name, description, price, sku, inventory, image, created_by) VALUES 
('Laptop HP Pavilion', 'Laptop HP Pavilion 15 pulgadas, Intel i5, 8GB RAM, 256GB SSD', 899.99, 'LAP-HP-001', 10, 'laptop-hp.jpg', 1),
('Mouse Inalámbrico Logitech', 'Mouse inalámbrico Logitech M705 con batería de larga duración', 45.99, 'MOU-LOG-001', 25, 'mouse-logitech.jpg', 1),
('Teclado Mecánico Razer', 'Teclado mecánico Razer BlackWidow con switches verdes', 129.99, 'TEC-RAZ-001', 8, 'teclado-razer.jpg', 1),
('Monitor Samsung 24"', 'Monitor Samsung 24 pulgadas Full HD, 75Hz, FreeSync', 199.99, 'MON-SAM-001', 15, 'monitor-samsung.jpg', 1),
('Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos Sony con cancelación de ruido', 349.99, 'AUR-SON-001', 6, 'auriculares-sony.jpg', 1);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_inventory ON products(inventory);
CREATE INDEX idx_user_sessions_token ON user_sessions(token);
CREATE INDEX idx_user_sessions_idUser ON user_sessions(idUser);
CREATE INDEX idx_user_sessions_tokenType ON user_sessions(tokenType);
CREATE INDEX idx_user_sessions_linkedToken ON user_sessions(linkedToken);
CREATE INDEX idx_user_sessions_date ON user_sessions(date);

-- Vista para productos públicos (inventario > 5)
CREATE VIEW products_public AS
SELECT 
    id,
    name,
    description,
    price,
    sku,
    inventory,
    image,
    created_at
FROM products 
WHERE inventory > 5;