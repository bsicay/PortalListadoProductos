import React, { useEffect } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useDeleteProduct from '@hooks/useDeleteProduct';
import styles from './DeleteConfirmModal.module.css';

function DeleteConfirmModal({ isOpen, onClose, product }) {
  const {
    deleteProduct, success, error, loading,
  } = useDeleteProduct();

  // Cerrar modal después de eliminación exitosa
  useEffect(() => {
    if (success) {
      handleClose();
      // Recargar la página para actualizar la lista
      window.location.reload();
    }
  }, [success]);

  const handleConfirmDelete = () => {
    if (product?.id) {
      deleteProduct(product.id);
    }
  };

  const handleClose = () => {
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
          {/* Warning Icon */}
          <div className={styles.iconContainer}>
            <ExclamationTriangleIcon className={styles.warningIcon} />
          </div>

          {/* Title */}
          <h2 className={styles.modalTitle}>¿Eliminar Producto?</h2>
          
          {/* Message */}
          <div className={styles.messageContainer}>
            <p className={styles.message}>
              ¿Estás seguro de que deseas eliminar el producto{' '}
              <strong>"{product.name}"</strong>?
            </p>
            <p className={styles.warningText}>
              Esta acción no se puede deshacer.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              {error?.message ?? 'Ocurrió un error al eliminar el producto.'}
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={loading}
              className={styles.deleteButton}
            >
              {loading ? 'Eliminando...' : 'Sí, Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
