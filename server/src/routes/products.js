import { Router } from 'express';
import { query } from '../db/connection.js';
import auth from '../middlewares/auth.js';

const router = Router();

// Obtener todos los productos (público - solo inventario > 5)
router.get('/public', async (req, res) => {
  try {
    const products = await query('SELECT * FROM products_public ORDER BY created_at DESC');
    res.json(products);
  } catch (error) {
    console.error('Error obteniendo productos públicos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener todos los productos (admin/colaborador)
router.get('/', auth, async (req, res) => {
  try {
    const products = await query(`
      SELECT p.*, 
             u1.name as created_by_name, 
             u2.name as updated_by_name
      FROM products p
      LEFT JOIN users u1 ON p.created_by = u1.id
      LEFT JOIN users u2 ON p.updated_by = u2.id
      ORDER BY p.created_at DESC
    `);
    res.json(products);
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener un producto por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const products = await query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(products[0]);
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Crear producto
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price, sku, inventory, image } = req.body;
    const userId = req.user.userId;

    if (!name || !price || !sku || inventory === undefined) {
      return res.status(400).json({ message: 'Nombre, precio, SKU e inventario son requeridos' });
    }

    // Verificar si el SKU ya existe
    const existingProducts = await query('SELECT id FROM products WHERE sku = ?', [sku]);
    if (existingProducts.length > 0) {
      return res.status(400).json({ message: 'El SKU ya existe' });
    }

    const result = await query(`
      INSERT INTO products (name, description, price, sku, inventory, image, created_by, updated_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, description, price, sku, inventory, image, userId, userId]);

    res.status(201).json({
      message: 'Producto creado exitosamente',
      productId: result.insertId
    });

  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar producto
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, sku, inventory, image } = req.body;
    const userId = req.user.userId;

    if (!name || !price || !sku || inventory === undefined) {
      return res.status(400).json({ message: 'Nombre, precio, SKU e inventario son requeridos' });
    }

    // Verificar si el producto existe
    const existingProducts = await query('SELECT id FROM products WHERE id = ?', [id]);
    if (existingProducts.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificar si el SKU ya existe en otro producto
    const skuCheck = await query('SELECT id FROM products WHERE sku = ? AND id != ?', [sku, id]);
    if (skuCheck.length > 0) {
      return res.status(400).json({ message: 'El SKU ya existe en otro producto' });
    }

    await query(`
      UPDATE products 
      SET name = ?, description = ?, price = ?, sku = ?, inventory = ?, image = ?, updated_by = ?
      WHERE id = ?
    `, [name, description, price, sku, inventory, image, userId, id]);

    res.json({ message: 'Producto actualizado exitosamente' });

  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar producto (solo administrador)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = req.user.role;

    // Solo administradores pueden eliminar
    if (userRole !== 'administrador') {
      return res.status(403).json({ message: 'No tienes permisos para eliminar productos' });
    }

    // Verificar si el producto existe
    const existingProducts = await query('SELECT id FROM products WHERE id = ?', [id]);
    if (existingProducts.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await query('DELETE FROM products WHERE id = ?', [id]);

    res.json({ message: 'Producto eliminado exitosamente' });

  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;