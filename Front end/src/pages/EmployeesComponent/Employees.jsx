import React, { useState } from 'react';
import TabNavigation from './Employeelist';
import EmployeeTable from '../DummyPage/EmployeesManagement/EmployeeTabs';

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const [assignments, setAssignments] = useState([]);

  

    

  

  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <p className="text-gray-600">Manage employees and assign inventory</p>
        </div>

        
      </div>

      {/* Tabs */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Views */}
      {activeTab === 'employees' && (
        <EmployeeTable
          employees={employees}
          
        />
      )}
     
     
    </div>
  );
};

export default EmployeeManagement;
