import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL, getAuthHeaders } from '../core/config';
import axios from 'axios';
import { toast } from 'react-toastify';
import banker_call from "../core/axios";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const [activeTab, setActiveTab] = useState("income");
  const [banks, setBanks] = useState([]);
  const navigate = useNavigate();

  // State for Forms
  const [transactionData, setTransactionData] = useState({
    amount: "",
    description: "",
    bank_id: null,
    category: "",
    transaction_date: new Date().toISOString().split('T')[0],
    from_account: "",
    to_account: ""
  });

    const categoryName = {
        'income':"Source",
        'expense':"Paid For",
        'transfer':"Reason"
    };


  // Fetch Banks for Dropdown
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await banker_call(`bank/list`,navigate);
        if (response.data.status) {
          setBanks(response.data.data);
        } else {
          toast.error("Failed to fetch banks");
          console.error("Failed to fetch banks:", response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching banks');
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  // Submit Form

  const submitTransaction = async (e) => {
    e.preventDefault();
    try {
      let endpoint = "";
      if (activeTab === "income") endpoint = "income/create";
      else if (activeTab === "expense") endpoint = "expense/create";
      else if (activeTab === "transfer") endpoint = "transaction/transfer/create";
      
      if(transactionData.bank_id === null && activeTab !== "transfer"){
        toast.error("Bank is required")
        return
      }
      if(transactionData.category === ""){
        toast.error("Source/Paid For/Reason is required")
        return
      }

      await axios.post(
        `${API_BASE_URL}/${endpoint}`,
        transactionData,
        { headers: getAuthHeaders() }
      );

      toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} added successfully!`);
      setTransactionData({
        amount: "",
        description: "",
        bank_id: null,
        category: "",
        transaction_date: new Date().toISOString().split('T')[0],
        from_account: "",
        to_account: ""
      });
    } catch (error) {
      console.error(`Error adding ${activeTab}:`, error);
      toast.error(`Failed to add ${activeTab}: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Transactions</h2>

      {/* Toggle Buttons */}
      <div className="btn-group d-flex mb-3">
        <button className={`btn ${activeTab === "income" ? "btn-success" : "btn-light"} flex-fill`} onClick={() => setActiveTab("income")}>
          Income
        </button>
        <button className={`btn ${activeTab === "expense" ? "btn-danger" : "btn-light"} flex-fill`} onClick={() => setActiveTab("expense")}>
          Expense
        </button>
        <button className={`btn ${activeTab === "transfer" ? "btn-primary" : "btn-light"} flex-fill`} onClick={() => setActiveTab("transfer")}>
          Transfer
        </button>
      </div>

      {/* Transaction Form */}
      <form className="card p-3 shadow" onSubmit={submitTransaction}>
        <h4 className={activeTab === "income" ? "text-success" : activeTab === "expense" ? "text-danger" : "text-primary"}>
          {activeTab === "income" ? "Add Income" : activeTab === "expense" ? "Add Expense" : "Transfer Money"}
        </h4>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            value={transactionData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter description"
            required
          />
        </div>
        {activeTab !== "transfer" && (
          <div className="mb-3">
            <label className="form-label">Bank</label>
            <select name="bank_id" value={transactionData.bank_id} onChange={handleChange} className="form-control" required>
                <option value="">Select Bank</option>
                {banks.map((bank) => (
                    (bank.is_credit_allow || activeTab === "expense") && <option key={bank.id} value={bank.id}>{bank.name} (A/C: {bank.account_number})</option>
                ))}
            </select>
          </div>
        )}
        
        {activeTab === "transfer" && (
          <>
            <div className="mb-3">
              <label className="form-label">From Account</label>
              <select name="from_account" value={transactionData.from_account} onChange={handleChange} className="form-control" required>
                <option value="">Select From Account</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>{bank.name} (A/C: {bank.account_number})</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">To Account</label>
              <select name="to_account" value={transactionData.to_account} onChange={handleChange} className="form-control" required>
                <option value="">Select To Account</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>{bank.name} (A/C: {bank.account_number})</option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="mb-3">
          <label className="form-label">{categoryName[activeTab]}</label>
          <select
            name="category"
            value={transactionData.category}
            onChange={handleChange}
            className="form-control"
          >
            {activeTab === "income" && (
              <>
                <option value="">-- Select --</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
              </>
            )}
            {activeTab === "expense" && (
                <>
                    <option value="">-- Select --</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Rent">Rent</option>
                    <option value="Utility">Utility</option>
                    <option value="Bill Payment">Bill Payment</option>
                    <option value="Other">Other</option>
                </>
            )}
            {activeTab === "transfer" && (
                <>
                <option value="">-- Select --</option>

                <option value="Money Add On">Money Add On</option>
                </>
            )}
                
            
        
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Transaction Date</label>
          <input
            type="date"
            name="transaction_date"
            value={transactionData.transaction_date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <button type="submit" className={`btn w-100 ${activeTab === "income" ? "btn-success" : "btn-danger"}`}>Save {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</button>
      </form>
    </div>
  );
};

export default Transaction;
