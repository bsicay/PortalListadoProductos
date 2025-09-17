import { single, multiple } from './product.dto.js';
import {
  createProduct,
  getProduct,
  getAllProducts,
  getPublicProducts,
  updateProduct,
  deleteProduct,
} from './product.model.js';

const createProductController = async (req, res) => {
  try {
    const { name, description, price, sku, inventory, image } = req.body;
    const { id } = req.session;

    const product = await createProduct({
      name,
      description,
      price,
      sku,
      inventory,
      image,
      createdBy: id,
    });

    res.status(201).json({
      message: 'Producto creado exitosamente',
      product: single(product, { showSensitiveData: false, showCreatorInfo: false })
    });
  } catch (ex) {
    console.error('Error creando producto:', ex);
    
    if (ex.message.includes('SKU ya existe')) {
      return res.status(400).json({ 
        message: 'El SKU ya existe' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor al crear producto' 
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ 
        message: 'ID de producto requerido' 
      });
    }

    const product = await getProduct({ 
      id, 
      showSensitiveData: true, 
      showCreatorInfo: true 
    });
    
    if (!product) {
      return res.status(404).json({ 
        message: 'Producto no encontrado' 
      });
    }

    res.status(200).json(single(product, { showSensitiveData: true, showCreatorInfo: true }));
  } catch (ex) {
    console.error('Error obteniendo producto:', ex);
    
    if (ex.message.includes('Error al obtener la información del producto')) {
      return res.status(500).json({ 
        message: 'Error interno del servidor al obtener información del producto' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor' 
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts({ 
      showSensitiveData: true, 
      showCreatorInfo: true 
    });

    res.status(200).json(multiple(products, { showSensitiveData: true, showCreatorInfo: true }));
  } catch (ex) {
    console.error('Error obteniendo productos:', ex);
    
    res.status(500).json({ 
      message: 'Error interno del servidor al obtener productos' 
    });
  }
};

const getPublicProductsController = async (req, res) => {
  try {
    const products = await getPublicProducts();

    res.status(200).json(multiple(products, { showSensitiveData: false, showCreatorInfo: false }));
  } catch (ex) {
    console.error('Error obteniendo productos públicos:', ex);
    
    res.status(500).json({ 
      message: 'Error interno del servidor al obtener productos públicos' 
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const { name, description, price, sku, inventory, image } = req.body;
    const { id } = req.session;

    if (!idProduct) {
      return res.status(400).json({ 
        message: 'ID de producto requerido' 
      });
    }

    console.log(idProduct);
    console.log(id);

    const product = await updateProduct({
      idProduct,
      name,
      description,
      price,
      sku,
      inventory,
      image,
      updatedBy: id,
    });

    res.status(200).json({
      message: 'Producto actualizado exitosamente',
      product: single(product, { showSensitiveData: true, showCreatorInfo: true })
    });
  } catch (ex) {
    console.error('Error actualizando producto:', ex);
    
    if (ex.message.includes('Producto no encontrado')) {
      return res.status(404).json({ 
        message: 'Producto no encontrado' 
      });
    }
    
    if (ex.message.includes('SKU ya existe')) {
      return res.status(400).json({ 
        message: 'El SKU ya existe en otro producto' 
      });
    }
    
    if (ex.message.includes('No hay campos para actualizar')) {
      return res.status(400).json({ 
        message: 'No hay campos para actualizar' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor al actualizar producto' 
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ 
        message: 'ID de producto requerido' 
      });
    }

    await deleteProduct({ id });

    res.status(200).json({ 
      message: 'Producto eliminado exitosamente' 
    });
  } catch (ex) {
    console.error('Error eliminando producto:', ex);
    
    if (ex.message.includes('Producto no encontrado')) {
      return res.status(404).json({ 
        message: 'Producto no encontrado' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor al eliminar producto' 
    });
  }
};

export {
  createProductController,
  getProductController,
  getAllProductsController,
  getPublicProductsController,
  updateProductController,
  deleteProductController,
};
