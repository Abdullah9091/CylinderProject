import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'admin' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (form.email === 'admin@example.com' && form.password === 'admin123' && form.role === 'admin') ||
      (form.email === 'employee@example.com' && form.password === 'emp123' && form.role === 'employee')
    ) {
      dispatch(login({ user: form.email, role: form.role }));
      navigate('/');
    } else {
      alert('Invalid credentials or role!');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-80">
        <h2 className="text-xl font-bold">Login</h2>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border w-full p-2" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border w-full p-2" required />
        <select name="role" value={form.role} onChange={handleChange} className="border w-full p-2">
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
