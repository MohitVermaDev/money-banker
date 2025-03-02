import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Transaction = () => {
  const [activeTab, setActiveTab] = useState("income");

  return (
    <div className="container mt-4">
      <h2 className="text-center">Transactions</h2>

      {/* Toggle Buttons */}
      <div className="btn-group d-flex mb-3">
        <button
          className={`btn ${activeTab === "income" ? "btn-primary" : "btn-light"} flex-fill`}
          onClick={() => setActiveTab("income")}
        >
          Income
        </button>
        <button
          className={`btn ${activeTab === "expense" ? "btn-danger" : "btn-light"} flex-fill`}
          onClick={() => setActiveTab("expense")}
        >
          Expense
        </button>
      </div>

      {/* Income Form */}
      {activeTab === "income" && (
        <form className="card p-3 shadow">
          <h4 className="text-primary">Add Income</h4>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input type="number" className="form-control" placeholder="Enter amount" />
          </div>
          <div className="mb-3">
            <label className="form-label">Source</label>
            <input type="text" className="form-control" placeholder="Enter source" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Save Income</button>
        </form>
      )}

      {/* Expense Form */}
      {activeTab === "expense" && (
        <form className="card p-3 shadow">
          <h4 className="text-danger">Add Expense</h4>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input type="number" className="form-control" placeholder="Enter amount" />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" placeholder="Enter category" />
          </div>
          <button type="submit" className="btn btn-danger w-100">Save Expense</button>
        </form>
      )}
    </div>
  );
};

export default Transaction;
