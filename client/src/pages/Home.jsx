import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import ProductList from '@components/ProductList/ProductList';
import CreateProductModal from '@components/CreateProductModal/CreateProductModal';
import { Button } from '@components/ui/Button';
import LoadingView from '@components/LoadingView/LoadingView';
import consts from '@helpers/consts';
import styles from './Home.module.css';
import getTokenPayload from '@helpers/getTokenPayload';
import useToken from '@hooks/useToken';

function Home() {
  const token = useToken();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  let content;

  if (token === undefined) {
    // Token aún no se ha cargado
    content = <LoadingView />;
  } else {
    // Token cargado (puede ser null o un token válido)
    let role = null;
    if (token !== null) {
      const tokenData = getTokenPayload(token);
      role = tokenData?.role;
    }

    content = (
      <Layout>
        <div className={styles.globalConfigPage}>
          <div className={styles.pageHeader}>
            <h1>Portal de Productos</h1>
            {token && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                Crear Producto
              </Button>
            )}
          </div>
          <ProductList />
        </div>
      </Layout>
    );
  }

  return (
    <>
      {content}
      {/* Create Product Modal */}
      <CreateProductModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}

export default Home
