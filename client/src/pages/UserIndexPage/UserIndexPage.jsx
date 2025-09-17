import { useState } from "react";
// Components

import { Routes, Route } from 'react-router-dom';
// import PageContainer from '../../components/PageContainer/PageContainer';
import Home from '@pages/Home'
import NotFoundPage from '../NotFoundPage/NotFoundPage';


function UserIndexPage() {

    const token = useToken();
    const user = token ? getTokenPayload(token) : null;
    return (
    //   <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    //   </PageContainer>
    );
}

export default UserIndexPage;



