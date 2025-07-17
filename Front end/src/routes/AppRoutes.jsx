import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard';
import Dummy from '../pages/DummyPage/Dummy';
import Supplier from '../pages/DummyPage/suppliers/Suppliers';
import Purchases from '../pages/DummyPage/Purchases/Purchase';
import InventoryManagement from '../pages/DummyPage/InventoryManagement/InventoryManage';
import CustomerManagement from '../pages/DummyPage/CustomerManagement/Customer';
import GasSales from '../pages/DummyPage/SaleManagement/Sales';
import CylinderManagement from '../pages/DummyPage/CylinderManagement/Cylinder';
import ProtectedRoute from '../components/ProtectedRoute/Protected';
import EmployeeManagement from '../pages/DummyPage/EmployeesManagement/Employees';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route
      path="/"
      element={
        <ProtectedRoute allowedRoles={['admin', 'employee']}>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    {/* Admin Routes */}
    <Route path="/suppliers" element={<ProtectedRoute allowedRoles={['admin']}><Supplier /></ProtectedRoute>} />
    <Route path="/purchases" element={<ProtectedRoute allowedRoles={['admin']}><Purchases /></ProtectedRoute>} />
    <Route path="/inventory" element={<ProtectedRoute allowedRoles={['admin']}><InventoryManagement /></ProtectedRoute>} />
    <Route path="/customers" element={<ProtectedRoute allowedRoles={['admin']}><CustomerManagement /></ProtectedRoute>} />
    <Route path="/gas-sales" element={<ProtectedRoute allowedRoles={['admin']}><GasSales /></ProtectedRoute>} />
    <Route path="/cylinders" element={<ProtectedRoute allowedRoles={['admin']}><CylinderManagement /></ProtectedRoute>} />
    <Route path="/employees" element={<ProtectedRoute allowedRoles={['admin']}><EmployeeManagement /></ProtectedRoute>} />

    {/* Both Admin + Employee */}
    <Route path="/reports" element={<ProtectedRoute allowedRoles={['admin', 'employee']}><Dummy /></ProtectedRoute>} />
    <Route path="/pl" element={<ProtectedRoute allowedRoles={['admin', 'employee']}><Dummy /></ProtectedRoute>} />

    {/* Unauthorized fallback */}
    <Route path="*" element={<div className="p-6 text-red-600 text-xl">404 - Page Not Found</div>} />
  </Routes>
);

export default AppRoutes;
