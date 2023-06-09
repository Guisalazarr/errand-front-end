import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import DefaultLayout from '../config/Layout/DefaultLayout/DefaultLayout';
import LoginLayout from '../config/Layout/LoginLayout';
import Welcome from '../pages/Welcome';
import Register from '../pages/Register';
import Errands from '../pages/Errands';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout component={Welcome} />} />
        <Route path="/login" element={<LoginLayout component={Login} />} />
        <Route path="/register" element={<LoginLayout component={Register} />} />
        <Route path="/home" element={<DefaultLayout component={Home} />} />
        <Route path="/errands" element={<DefaultLayout component={Errands} />} />
        <Route path="/errands/:errandId" element={<DefaultLayout component={Errands} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
