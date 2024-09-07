import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@libs/client/ProtectedRoute';
import { ContentLayout } from './layouts/ContentLayout';
import { RootLayout } from './layouts/RootLayout';
import React, { lazy } from 'react';

const NotFound = lazy(() => import('./pages/NotFound.js'));
const OAuth = lazy(() => import('./pages/auth/OAuth.js'));
const Admin = lazy(() => import('./pages/Admin.js'));

const Home = lazy(() => import('./pages/Home.js'));

const router = (
  <BrowserRouter>
    <Routes>
      <Route path='/oauth/:provider' element={<OAuth />} />
      <Route element={<RootLayout />}>
        <Route element={<ContentLayout />}>
          <Route path='/admin' element={<ProtectedRoute element={<Admin />} />} />

          <Route path='/' element={<Home />} />

          <Route path='/*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export { router };

