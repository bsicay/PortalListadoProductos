import { useContext } from 'react';
import { serverHost } from '../config';
import useFetch from './useFetch';
import SessionContext from '../context/SessionContext';

function useCreateProduct() {
  const {
    callFetch, result, error, loading,
  } = useFetch();
  const { accessToken } = useContext(SessionContext);

  const createProduct = async ({
    name,
    description,
    price,
    sku,
    inventory,
    image,
  }) => {
    const uri = `${serverHost}/products`;
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
      method: 'POST',
      body,
      headers,
    });
  };

  return {
    createProduct,
    success: result,
    error,
    loading,
  };
}

export default useCreateProduct;
