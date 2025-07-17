import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar/Sidebar';
import AppRoutes from './routes/AppRoutes';
import Navbar from './pages/Navbar';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen">
        {isAuthenticated && <Sidebar />}

        <div className="flex-1">
          {isAuthenticated && <Navbar />}  
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;
