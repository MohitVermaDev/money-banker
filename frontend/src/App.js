import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/authSlice';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Transaction from './pages/Transaction';
import Bank from './pages/Bank';
// import Expense from './pages/Expense';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    
      <Router>
        {isAuthenticated && <Navbar />}
          <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/income" element={<Income />} /> */}
            <Route path="/bank" element={<Bank />} />
            <Route path="/transaction" element={<Transaction />} />
            {/* <Route path="/expense" element={<Expense />} /> */}
          </Route>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </Router>
  );
}

// ✅ Reusable Private Route Component
const ProtectedRoutes = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
