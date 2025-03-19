import React from "react";
import { Link, useLocation } from "react-router-dom";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bottom-navbar">
      <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
        <i className="fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </Link>

      <Link to="/bank" className={`nav-item ${location.pathname === "/bank" ? "active" : ""}`}>
        <i className="fas fa-university"></i>
        <span>Bank</span>
      </Link>

      <Link to="/transaction" className={`nav-item ${location.pathname === "/transaction" ? "active" : ""}`}>
        <i className="fas fa-exchange-alt"></i>
        <span>Transactions</span>
      </Link>

      <Link to="/reports" className={`nav-item ${location.pathname === "/reports" ? "active" : ""}`}>
        <i className="fas fa-chart-line"></i>
        <span>Reports</span>
      </Link>

      <Link to="/calculator" className={`nav-item ${location.pathname === "/calculator" ? "active" : ""}`}>
        <i className="fas fa-calculator"></i>
        <span>Calculator</span>
      </Link>
    </nav>
  );
};

export default BottomNavbar;
