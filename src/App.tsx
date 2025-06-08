import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OrderHistory from './pages/OrderHistory';
import Layout from './components/Layout';
import CustomerPage from './pages/CustomerPage';
import QR from './pages/QR';
import MessageAll from './pages/MessageAll';
import { ProductManagementPage } from './components/Product Management/ProductManagementPage';


function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/CustomerPage" element={<CustomerPage />} />
          <Route path="/QR" element={<QR />} />
          <Route path="/MessageAll" element={<MessageAll />} />
          <Route path="ProductMangementPage" element={<ProductManagementPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
