import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import uiReducer from '../features/ui/uiSlice';
import suppliersReducer from '../features/suppliers/suppliersSlice';
import purchaseReducer from '../features/Purchases/PurchasesSlice'
// import inventoryReducer from '../features/InventoryManagement/Inventory'
import customerReducer from '../features/CustomerSlice/Customer';
import salesReducer from '../features/SalesSlice/Sales';
import productsReducer from '../features/SalesSlice/product'
import cylinderReducer from '../features/CylinderManagement/CylinderSlice'
import employeeReducer from '../features/EmployeesSlice/Employees'
import authReducer from '../features/auth/authSlice'
import analyticsReducer from '../features/Report/ReportSlice';
import assignedStockReducer from '../features/EmployeesSlice/assignedStockSlice';


export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    ui: uiReducer,
    suppliers: suppliersReducer,
    purchase: purchaseReducer,
    // inventory: inventoryReducer,
    customers: customerReducer,
    sales: salesReducer,
    products: productsReducer,
    cylinders: cylinderReducer,
    employees: employeeReducer,
    auth: authReducer,
    analytics: analyticsReducer,
        assignedStock: assignedStockReducer,






  },
});
