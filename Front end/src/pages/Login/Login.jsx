import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { fetchEmployees } from '../../features/EmployeesSlice/Employees';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state) => state.employees.list);
  const [form, setForm] = useState({ email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, role } = form;

    if (
      email === 'admin@example.com' &&
      password === 'admin123' &&
      role === 'admin'
    ) {
      dispatch(login({ user: email, role }));
      navigate('/');
    } else if (role === 'employee') {
      const matchedEmployee = employees.find(
        (emp) => emp.email === email && emp.password === password && emp.role === 'employee'
      );

      if (matchedEmployee) {
        dispatch(login({ user: matchedEmployee.email, role: matchedEmployee.role }));
        navigate('/');
      } else {
        setError('Invalid employee credentials!');
      }
    } else {
      setError('Invalid credentials or role!');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border w-full p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border w-full p-2 rounded"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
