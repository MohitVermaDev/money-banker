import React from "react";
import { Link } from "react-router-dom";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";

const BottomNavbar = () => {
  return (
    <nav className="bottom-navbar">
      <Link to="/" className="nav-item">
        <i className="fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </Link>

      <Link to="/bank" className="nav-item">
        <i className="fas fa-university"></i>
        <span>Bank</span>
      </Link>

      <Link to="/transaction" className="nav-item">
        <i className="fas fa-exchange-alt"></i>
        <span>Transactions</span>
      </Link>

      <Link to="/reports" className="nav-item">
        <i className="fas fa-chart-line"></i>
        <span>Reports</span>
      </Link>

      <Link to="/reports" className="nav-item">
        <i className="fas fa-calculator"></i>
        <span>Calculators</span>
      </Link>
    </nav>
  );
};

export default BottomNavbar;
