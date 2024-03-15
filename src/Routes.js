// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import AllItems from './components/all-items';
import Cart from './components/cart';
import Test from './components/test';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/all-items" element={<AllItems />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/test" element={<Test />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

function RoutesContainer() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default RoutesContainer;
