import React, { useState } from 'react';
import TabNavigation from './EmployeeTabs';
import EmployeeTable from './EmployeeList';
import AssignStockModal from './AssignStockModal';
import AddEmployeeModal from './AddEmployeeModal';
import StockAssignments from './StockAssignments';

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const [assignments, setAssignments] = useState([]);

  const handleAddOrUpdateEmployee = (employee) => {
    if (editingEmployeeId) {
      const updated = employees.map(emp =>
        emp.id === editingEmployeeId ? { ...emp, ...employee } : emp
      );
      setEmployees(updated);
    } else {
      const newEmployee = {
        ...employee,
        id: Date.now(),
        joinDate: new Date().toLocaleDateString(),
        status: 'active',
        stock: [],
      };
      setEmployees([...employees, newEmployee]);
    }

    setFormData({});
    setEditingEmployeeId(null);
    setShowAddModal(false);
    setActiveTab('employees');
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleToggleStatus = (id) => {
    setEmployees(employees.map(emp =>
      emp.id === id
        ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' }
        : emp
    ));
  };

  // ✅ Edit Employee
  const handleEditEmployee = (emp) => {
    setEditingEmployeeId(emp.id);
    setFormData({
      name: emp.name,
      email: emp.email,
      password: '',
    });
    setShowAddModal(true);
  };

  // ✅ Handle Stock Assignment from Modal
  const handleAssignStock = (assignment) => {
    setAssignments(prev => [...prev, assignment]);
    setShowStockModal(false);
  };

  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <p className="text-gray-600">Manage employees and assign inventory</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setFormData({});
              setEditingEmployeeId(null);
              setShowAddModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Employee
          </button>
          <button
            onClick={() => setShowStockModal(true)}
            className="bg-white border px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            📦 Assign Stock
          </button>
        </div>
      </div>

      {/* Tabs */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Views */}
      {activeTab === 'employees' && (
        <EmployeeTable
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onToggleStatus={handleToggleStatus}
        />
      )}
      {activeTab === 'stock' && (
        <StockAssignments assignments={assignments} />
      )}
      {activeTab === 'notifications' && (
        <div>🔔 Notifications List</div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddEmployeeModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setEditingEmployeeId(null);
          }}
          onSubmit={handleAddOrUpdateEmployee}
          formData={formData}
          setFormData={setFormData}
          editingEmployeeId={editingEmployeeId}
        />
      )}

      {showStockModal && (
        <AssignStockModal
          onClose={() => setShowStockModal(false)}
          employees={employees}
          onAssign={handleAssignStock}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
