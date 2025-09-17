import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import useFetch from '../../hooks/useFetch';
import useToken from '../../hooks/useToken';
import { serverHost } from '../../config';
import ProductCard from '../ProductCard/ProductCard';

/**
 * Componente que muestra el listado de productos.
 */
function ProductList() {
  const {
    callFetch: fetchProducts, result: products, loading, error,
  } = useFetch();
  const token = useToken();

  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    // Obtener listado de productos públicos
    fetchProducts({ 
      uri: `${serverHost}/products/public`, 
      headers: {} 
    });
  }, []);

  const handleImageError = (id) => setImageErrors((val) => ({ ...val, [id]: true }));

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error al cargar los productos: {error.message}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.noResultsContainer}>
        <p>No se encontraron productos disponibles.</p>
      </div>
    );
  }

  return (
    <div className={styles.ProductList}>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onImageError={() => handleImageError(product.id)}
            imageError={imageErrors[product.id]}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
