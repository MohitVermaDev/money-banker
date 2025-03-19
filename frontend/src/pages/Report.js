import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "../core/config";
import { toast } from "react-toastify";

const Report = () => {
  const [transactions, setTransactions] = useState([]);
  const [fromDate, setFromDate] = useState("2024-10-30");
  const [toDate, setToDate] = useState("2025-10-31");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Number of transactions per page

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transaction/list`, {
        headers: getAuthHeaders(),
        params: {
          from_date: fromDate,
          to_date: toDate,
          page,
          page_size: pageSize,
        },
      });

      if (response.data.status) {
        setTransactions(response.data.data.transactions);
        setTotalPages(response.data.data.total_pages);
      } else {
        toast.error("Failed to fetch transactions");
      }
    } catch (error) {
      toast.error("Error fetching transactions");
      console.error("Error:", error);
    }
  }, [page, fromDate, toDate]);

  // Fetch transactions
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="container mt-4">
    <section className="content-header">
            <div className="">
                <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary card-outline">
                    <div className="card-header">
                        <h3 className="card-title" style={{ fontWeight: "bold", fontSize: "28px" }}>
                        Transaction Report
                        </h3>
                        
                    </div>
        <div className="card-body">
        <div className="row mb-3">
        <div className="col-md-5">
          <label className="form-label">From Date</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <label className="form-label">To Date</label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={fetchTransactions}>
            Filter
          </button>
        </div>
      </div>
        </div>

     
    </div>
    </div>
    </div>
    </div>
    </section>
        <section className="content-header">
            <div className="">
                <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary card-outline">
                    
        <div className="card-body" style={{overflow: "scroll"}}>
        <table className="table table-bordered tranaction_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Bank Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn, index) => (
                <tr key={txn.id} className={txn.type}>
                  <td>{index + 1}</td>
                  <td style={{color:(txn.type === 'income' ? 'green': 'red'),fontWeight:'bold'}}>Rs {txn.amount}</td>
                  <td>{txn.category}</td>
                  <td>{txn.description}</td>
                  <td>{txn.bank_name || "N/A"}</td>
                  <td>{txn.transaction_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>

  );
};

export default Report;
