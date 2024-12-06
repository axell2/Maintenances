import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CarsList from './components/cars/CarList';
import CarDetails from './components/cars/CarDetails';
import NewMaintenanceService from './components/maintenance_services/NewMaintenanceService';
import NewCar from './components/cars/NewCar';
import MaintenanceServiceList from './components/maintenance_services/MaintenanceServicesList';
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <div>
        <h1>Welcome to My App</h1>

        {/* Enlaces para navegar */}
        {!token ? (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        ) : (
          <div>
            <h2>Welcome, you are logged in!</h2>
            <button onClick={() => {
              localStorage.removeItem('token');
              setToken('');
            }}>Logout</button>

            <Link to="/cars">Go to Cars List</Link>
            <Link to="/maintenance_services">Go to Maintenance Services List</Link>
          </div>
        )}

        <Routes>
          {/* Rutas para el login y signup */}
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/cars" element={token ? <CarsList /> : <Navigate to="/login" replace />} />
          <Route path="/cars/:id" element={token ? <CarDetails /> : <Navigate to="/login" replace />} />
          <Route path="/cars/:id/maintenance_services/new" element={token ? <NewMaintenanceService /> : <Navigate to="/login" replace />}/>
          <Route path="/cars/new" element={token ? <NewCar /> : <Navigate to="/login" replace />} />
          <Route path="/maintenance_services" element={token ? <MaintenanceServiceList /> : <Navigate to="/login" replace />} />

        

        </Routes>
      </div>
    </Router>
  );
};

export default App;
