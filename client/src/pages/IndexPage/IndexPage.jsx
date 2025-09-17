import React, { useEffect } from 'react';
import useToken from '@hooks/useToken';
import LoadingView from '@components/LoadingView/LoadingView';
import consts from '@helpers/consts';
import Home from '@pages/Home';

function IndexPage() {
  const token = useToken();
  let page;

  if (token === null) page = <Home />;
  else if (token !== undefined) {
    // Todos los usuarios logueados van a Home
    page = <Home />;
  } else page = <LoadingView />;

  useEffect(() => {
    if (!token) return;

    const firstAccess = sessionStorage.getItem(consts.firstAccessKey);

    if (firstAccess === null) return;

    // Si hay un valor 'firstAccess' es sessionStorage, mostrar mensaje
    sessionStorage.removeItem(consts.firstAccessKey);
  }, [token]);

  return (
    <>
      {page}
    </>
  );
}

export default IndexPage;
