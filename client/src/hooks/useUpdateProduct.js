import { useContext } from 'react';
import { serverHost } from '../config';
import useFetch from './useFetch';
import SessionContext from '../context/SessionContext';

function useUpdateProduct() {
  const {
    callFetch, result, error, loading,
  } = useFetch();
  const { accessToken } = useContext(SessionContext);

  const updateProduct = async ({
    idProduct,
    name,
    description,
    price,
    sku,
    inventory,
    image,
  }) => {
    const uri = `${serverHost}/products/${idProduct}`;
    const body = JSON.stringify({
      name,
      description,
      price,
      sku,
      inventory,
      image,
    });
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`,
    };

    callFetch({
      uri,
      method: 'PUT',
      body,
      headers,
    });
  };

  return {
    updateProduct,
    success: result,
    error,
    loading,
  };
}

export default useUpdateProduct;
