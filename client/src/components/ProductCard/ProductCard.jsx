import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineRight as RightArrowIcon } from 'react-icons/ai';
import { BiSolidImage as ImageIcon } from 'react-icons/bi';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@components/ui/Button';
import UpdateProductModal from '@components/UpdateProductModal/UpdateProductModal';
import DeleteConfirmModal from '@components/DeleteConfirmModal/DeleteConfirmModal';
import useToken from '@hooks/useToken';
import getTokenPayload from '@helpers/getTokenPayload';
import consts from '@helpers/consts';
import styles from './ProductCard.module.css';

/**
 * Componente que muestra la información de un producto individual.
 */
function ProductCard({ product, onImageError, imageError }) {
  const token = useToken();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Obtener el rol del usuario si está logueado
  let userRole = null;
  if (token) {
    const tokenData = getTokenPayload(token);
    userRole = tokenData?.role;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'QTZ',
      minimumFractionDigits: 0,
    }).format(price);
  };


  const getInventoryClass = (inventory) => {
    if (inventory > 10) return styles.inventoryAvailable;
    if (inventory > 5) return styles.inventoryLow;
    if (inventory > 0) return styles.inventoryVeryLow;
    return styles.inventoryOut;
  };

  return (
    <div className={styles.ProductCard}>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          {!imageError ? (
            <img
              className={styles.productImage}
              src={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              onError={onImageError}
            />
          ) : (
            <div className={styles.defaultImageContainer}>
              <ImageIcon className={styles.defaultIcon} />
            </div>
          )}
          
          <div className={styles.inventoryBadge}>
            <span className={`${styles.inventoryText} ${getInventoryClass(product.inventory)}`}>
            </span>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDescription}>
              {product.description?.length > 100 
                ? `${product.description.substring(0, 100)}...` 
                : product.description
              }
            </p>
            
            <div className={styles.productDetails}>
              <div className={styles.priceContainer}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
              </div>
              
              <div className={styles.skuContainer}>
                <span className={styles.skuLabel}>SKU:</span>
                <span className={styles.skuValue}>{product.sku}</span>
              </div>
            </div>
          </div>

          {/* Botones de acción - Solo si el usuario está logueado */}
          {token && (
            <div className={styles.actionButtons}>
              {/* Botón Actualizar - Admin y Colaborador */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsUpdateModalOpen(true)}
              >
                <PencilIcon className={styles.buttonIcon} />
                Actualizar
              </Button>
              
              {/* Botón Eliminar - Solo Admin */}
              {userRole?.includes(consts.roles.admin) && (
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <TrashIcon className={styles.buttonIcon} />
                  Eliminar
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Update Product Modal */}
      <UpdateProductModal 
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={product}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        product={product}
      />
    </div>
  );
}

export default ProductCard;
