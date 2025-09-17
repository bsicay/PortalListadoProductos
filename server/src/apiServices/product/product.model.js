import { query } from '../../db/connection.js';
import { single, multiple } from './product.dto.js';

const createProduct = async ({
  name,
  description,
  price,
  sku,
  inventory,
  image,
  createdBy,
}) => {
  try {
    // Verificar si el SKU ya existe
    const existingProducts = await query('SELECT id FROM products WHERE sku = ?', [sku]);
    if (existingProducts.length > 0) {
      throw new Error('El SKU ya existe');
    }

    // Crear producto
    const result = await query(`
      INSERT INTO products (name, description, price, sku, inventory, image, created_by, updated_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [name.trim(), description?.trim() || null, price, sku.trim(), inventory, image?.trim() || null, createdBy, createdBy]);

    // Obtener el producto creado
    const newProducts = await query(`
      SELECT p.*, 
             u1.name as created_by_name, 
             u2.name as updated_by_name
      FROM products p
      LEFT JOIN users u1 ON p.created_by = u1.id
      LEFT JOIN users u2 ON p.updated_by = u2.id
      WHERE p.id = ?
    `, [result.insertId]);
    
    if (newProducts.length === 0) {
      throw new Error('Error al crear el producto');
    }

    return single(newProducts[0], { showSensitiveData: true, showCreatorInfo: true });
  } catch (ex) {
    if (ex.message.includes('SKU ya existe')) {
      throw new Error('El SKU ya existe');
    }
    if (ex.code === 'ER_DUP_ENTRY') {
      throw new Error('El SKU ya existe');
    }
    throw ex;
  }
};

const getProduct = async ({ idProduct, showSensitiveData = false, showCreatorInfo = false }) => {
  try {
    const result = await query(`
      SELECT p.*, 
             u1.name as created_by_name, 
             u2.name as updated_by_name
      FROM products p
      LEFT JOIN users u1 ON p.created_by = u1.id
      LEFT JOIN users u2 ON p.updated_by = u2.id
      WHERE p.id = ?
    `, [idProduct]);
    
    if (result.length === 0) {
      return null;
    }

    return single(result[0], { showSensitiveData, showCreatorInfo });
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    throw new Error('Error al obtener la información del producto');
  }
};

const getAllProducts = async ({ showSensitiveData = false, showCreatorInfo = false } = {}) => {
  try {
    const result = await query(`
      SELECT p.*, 
             u1.name as created_by_name, 
             u2.name as updated_by_name
      FROM products p
      LEFT JOIN users u1 ON p.created_by = u1.id
      LEFT JOIN users u2 ON p.updated_by = u2.id
      ORDER BY p.created_at DESC
    `);
    
    return multiple(result, { showSensitiveData, showCreatorInfo });
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    throw new Error('Error al obtener la lista de productos');
  }
};

const getPublicProducts = async () => {
  try {
    const result = await query(`
      SELECT p.*, 
             u1.name as created_by_name, 
             u2.name as updated_by_name
      FROM products p
      LEFT JOIN users u1 ON p.created_by = u1.id
      LEFT JOIN users u2 ON p.updated_by = u2.id
      WHERE p.inventory > 5
      ORDER BY p.created_at DESC
    `);
    
    return multiple(result, { showSensitiveData: true, showCreatorInfo: false });
  } catch (error) {
    console.error('Error obteniendo productos públicos:', error);
    throw new Error('Error al obtener la lista de productos públicos');
  }
};

const updateProduct = async ({
  idProduct,
  name,
  description,
  price,
  sku,
  inventory,
  image,
  updatedBy,
}) => {
  try {
    // Verificar si el producto existe
    const existingProducts = await query('SELECT id FROM products WHERE id = ?', [idProduct]);
    if (existingProducts.length === 0) {
      throw new Error('Producto no encontrado');
    }

    // Verificar si el SKU ya existe en otro producto
    const skuCheck = await query('SELECT id FROM products WHERE sku = ? AND id != ?', [sku, idProduct]);
    if (skuCheck.length > 0) {
      throw new Error('El SKU ya existe en otro producto');
    }

    // Construir query dinámico solo con campos proporcionados
    const updates = [];
    const values = [];

    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name.trim());
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description?.trim() || null);
    }
    if (price !== undefined) {
      updates.push('price = ?');
      values.push(price);
    }
    if (sku !== undefined) {
      updates.push('sku = ?');
      values.push(sku.trim());
    }
    if (inventory !== undefined) {
      updates.push('inventory = ?');
      values.push(inventory);
    }
    if (image !== undefined) {
      updates.push('image = ?');
      values.push(image?.trim() || null);
    }

    if (updates.length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    updates.push('updated_by = ?');
    values.push(updatedBy);
    values.push(idProduct);

    await query(`
      UPDATE products 
      SET ${updates.join(', ')}
      WHERE id = ?
    `, values);

    // Obtener el producto actualizado
    const updatedProducts = await query(`
      SELECT p.*, 
             u1.name as created_by_name, 
             u2.name as updated_by_name
      FROM products p
      LEFT JOIN users u1 ON p.created_by = u1.id
      LEFT JOIN users u2 ON p.updated_by = u2.id
      WHERE p.id = ?
    `, [idProduct]);

    return single(updatedProducts[0], { showSensitiveData: true, showCreatorInfo: true });
  } catch (ex) {
    if (ex.message.includes('Producto no encontrado')) {
      throw new Error('Producto no encontrado');
    }
    if (ex.message.includes('SKU ya existe')) {
      throw new Error('El SKU ya existe en otro producto');
    }
    throw ex;
  }
};

const deleteProduct = async ({ idProduct }) => {
  try {
    // Verificar si el producto existe
    const existingProducts = await query('SELECT id FROM products WHERE id = ?', [idProduct]);
    if (existingProducts.length === 0) {
      throw new Error('Producto no encontrado');
    }

    await query('DELETE FROM products WHERE id = ?', [idProduct]);
    return true;
  } catch (error) {
    if (error.message.includes('Producto no encontrado')) {
      throw new Error('Producto no encontrado');
    }
    console.error('Error eliminando producto:', error);
    throw new Error('Error al eliminar el producto');
  }
};

export {
  createProduct,
  getProduct,
  getAllProducts,
  getPublicProducts,
  updateProduct,
  deleteProduct,
};
