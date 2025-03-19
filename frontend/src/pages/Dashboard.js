import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';
import { API_BASE_URL, getAuthHeaders } from '../core/config';
import { Button, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import banker_call from '../core/axios';

const Dashboard = () => {
    const [banks, setBanks] = useState([]);
    const navigate = useNavigate();

    const colors = ['red','green','blue','yellow','black'];

    function getRandomString(strings) {
        if (!Array.isArray(strings) || strings.length === 0) {
            throw new Error("Input must be a non-empty array of strings");
        }
        const randomIndex = Math.floor(Math.random() * strings.length);
        return strings[randomIndex];
    }

  // Fetch Banks List (Memoized)
  const fetchBanks = useCallback(async () => {
    try {
    const response = await banker_call(`bank/list`,navigate);
      if (response.data.status) {
        setBanks(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching banks');
      console.error('Error fetching banks:', error);
    }
  }, []);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  return (
    <Container className="mt-5">
      <Carousel indicators={false}>
        {banks.length > 0 && (
            banks.map((bank) => (
                <Carousel.Item className={getRandomString(colors)}>
                    <div className="dashboard-widget" >
                        <div className="info-box">
                            <span className="icon-shift"><i className="fas fa-university"></i></span>
                            <div className="info-box-content">
                                <span className="info-box-text">{bank.name}</span>
                                <span className="info-box-number">Rs. {bank.net_balance}</span>
                                <Link to='/bank'>Manage</Link>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            ))
        )}
        </Carousel>

        <div class="row">
            <div class="col-6 menu-boxes">
                <Link to="/transaction">
                    <div class="info-box shadow-lg">
                        <div class="info-box-content">
                            <span class="info-box-icon bg-danger">
                                <i class="fas fa-rupee-sign" ></i>
                            </span>
                            <span class="info-box-text" >Transactions</span>
                            <span class="info-box-number">Income/Expense/Transfer</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        

    </Container>
  );
};

export default Dashboard;