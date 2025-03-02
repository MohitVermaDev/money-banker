import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../core/config';


const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }
//       try {
//         const response = await fetch('http://localhost:8000/user/me', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setUser(data);
//         } else {
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error('Failed to fetch user:', error);
//       }
//     };

//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/transactions');
//         const data = await response.json();
//         if (response.ok) {
//           setTransactions(data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch transactions:', error);
//       }
//     };

//     fetchUser();
//     fetchTransactions();
//   }, [navigate]);

  return (
    <Container className="mt-5">
      {/* <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Welcome, {user?.name}</Card.Title>
              <Card.Text>Email: {user?.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h2>Transactions</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.type}</td>
                  <td>{txn.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Dashboard;