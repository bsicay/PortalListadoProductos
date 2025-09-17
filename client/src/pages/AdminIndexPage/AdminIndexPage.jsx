import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import PageContainer from '@components/PageContainer/PageContainer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import Home from '@pages/Home'
import useToken from '../../hooks/useToken';
import getTokenPayload from '../../helpers/getTokenPayload';

function AdminIndexPage() {
  const token = useToken();
  const user = token ? getTokenPayload(token) : null;
  return (
    // <PageContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    // </PageContainer>
  );
}

export default AdminIndexPage;
