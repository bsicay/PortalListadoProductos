import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useUpdateProduct from '@hooks/useUpdateProduct';
import styles from './UpdateProductModal.module.css';

function UpdateProductModal({ isOpen, onClose, product }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {
    updateProduct, success, error, loading,
  } = useUpdateProduct();

  // Inicializar el formulario con los datos del producto
  useEffect(() => {
    if (product && isOpen) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        sku: product.sku || '',
        inventory: product.inventory || '',
        image: product.image || '',
      });
      setErrors({});
    }
  }, [product, isOpen]);

  // Cerrar modal después de actualización exitosa
  useEffect(() => {
    if (success) {
      handleClose();
      // Opcional: mostrar mensaje de éxito o recargar datos
      window.location.reload(); // Recarga simple para actualizar la lista
    }
  }, [success]);

  const handleFormChange = (e) => {
    const field = e.target.name;
    const { value } = e.target;
    setForm((lastValue) => ({ ...lastValue, [field]: value }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearError = (e) => {
    setErrors((lastVal) => ({ ...lastVal, [e.target.name]: null }));
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value?.trim()) {
          setErrors((lastVal) => ({ ...lastVal, name: 'El nombre es obligatorio.' }));
          return false;
        }
        break;
      case 'description':
        if (!value?.trim()) {
          setErrors((lastVal) => ({ ...lastVal, description: 'La descripción es obligatoria.' }));
          return false;
        }
        break;
      case 'price':
        if (!value || isNaN(value) || parseFloat(value) <= 0) {
          setErrors((lastVal) => ({ ...lastVal, price: 'El precio debe ser un número mayor a 0.' }));
          return false;
        }
        break;
      case 'sku':
        if (!value?.trim()) {
          setErrors((lastVal) => ({ ...lastVal, sku: 'El SKU es obligatorio.' }));
          return false;
        }
        break;
      case 'inventory':
        if (!value || isNaN(value) || parseInt(value) < 0) {
          setErrors((lastVal) => ({ ...lastVal, inventory: 'El inventario debe ser un número mayor o igual a 0.' }));
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const validateAllFields = () => {
    const fields = ['name', 'description', 'price', 'sku', 'inventory'];
    let isValid = true;
    
    fields.forEach(field => {
      if (!validateField(field, form[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    
    if (!validateAllFields()) return;
    
    updateProduct({
      idProduct: product.id,
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      sku: form.sku,
      inventory: parseInt(form.inventory),
      image: form.image,
    });
  };

  const handleClose = () => {
    setForm({});
    setErrors({});
    onClose();
  };

  // Cerrar modal al hacer clic fuera de él
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={handleClose}>
          <XMarkIcon className={styles.closeIcon} />
        </button>

        {/* Modal Content */}
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Actualizar Producto</h2>
          
          <form className={styles.updateForm} onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.inputLabel}>
                Nombre del Producto *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ingrese el nombre del producto"
                value={form.name || ''}
                onChange={handleFormChange}
                onBlur={(e) => validateField('name', e.target.value)}
                onFocus={clearError}
                className={`${styles.input} ${errors?.name ? styles.inputError : ''}`}
              />
              {errors?.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            {/* Description Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="description" className={styles.inputLabel}>
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Ingrese la descripción del producto"
                value={form.description || ''}
                onChange={handleFormChange}
                onBlur={(e) => validateField('description', e.target.value)}
                onFocus={clearError}
                className={`${styles.textarea} ${errors?.description ? styles.inputError : ''}`}
                rows={3}
              />
              {errors?.description && (
                <span className={styles.errorText}>{errors.description}</span>
              )}
            </div>

            {/* Price Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="price" className={styles.inputLabel}>
                Precio *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form.price || ''}
                onChange={handleFormChange}
                onBlur={(e) => validateField('price', e.target.value)}
                onFocus={clearError}
                className={`${styles.input} ${errors?.price ? styles.inputError : ''}`}
              />
              {errors?.price && (
                <span className={styles.errorText}>{errors.price}</span>
              )}
            </div>

            {/* SKU Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="sku" className={styles.inputLabel}>
                SKU *
              </label>
              <input
                id="sku"
                name="sku"
                type="text"
                placeholder="Ingrese el SKU del producto"
                value={form.sku || ''}
                onChange={handleFormChange}
                onBlur={(e) => validateField('sku', e.target.value)}
                onFocus={clearError}
                className={`${styles.input} ${errors?.sku ? styles.inputError : ''}`}
              />
              {errors?.sku && (
                <span className={styles.errorText}>{errors.sku}</span>
              )}
            </div>

            {/* Inventory Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="inventory" className={styles.inputLabel}>
                Inventario *
              </label>
              <input
                id="inventory"
                name="inventory"
                type="number"
                min="0"
                placeholder="0"
                value={form.inventory || ''}
                onChange={handleFormChange}
                onBlur={(e) => validateField('inventory', e.target.value)}
                onFocus={clearError}
                className={`${styles.input} ${errors?.inventory ? styles.inputError : ''}`}
              />
              {errors?.inventory && (
                <span className={styles.errorText}>{errors.inventory}</span>
              )}
            </div>

            {/* Image Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="image" className={styles.inputLabel}>
                URL de la Imagen
              </label>
              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={form.image || ''}
                onChange={handleFormChange}
                className={styles.input}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Actualizando...' : 'Actualizar Producto'}
            </button>

            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>
                {error?.message ?? 'Ocurrió un error al actualizar el producto.'}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductModal;
