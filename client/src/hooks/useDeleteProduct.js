import { useContext } from 'react';
import { serverHost } from '../config';
import useFetch from './useFetch';
import SessionContext from '../context/SessionContext';

function useDeleteProduct() {
  const {
    callFetch, result, error, loading,
  } = useFetch();
  const { accessToken } = useContext(SessionContext);

  const deleteProduct = async (id) => {
    const uri = `${serverHost}/products/${id}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`,
    };

    callFetch({
      uri,
      method: 'DELETE',
      headers,
    });
  };

  return {
    deleteProduct,
    success: result,
    error,
    loading,
  };
}

export default useDeleteProduct;
