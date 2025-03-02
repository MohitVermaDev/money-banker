import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { API_BASE_URL, getAuthHeaders } from '../core/config';

const Bank = () => {
  const [banks, setBanks] = useState([]);
  const { token } = useSelector((state) => state.auth);

  // Fetch Banks List (Memoized)
  const fetchBanks = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bank/list`, {
        headers: getAuthHeaders(),
      });
      if (response.data.status) {
        setBanks(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching banks');
      console.error('Error fetching banks:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  // Create a Bank with SweetAlert2 Modal
  const createBank = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Bank',
      html: `
        <input id="swal-bank-name" class="swal2-input" placeholder="Bank Name">
        <input id="swal-account-number" class="swal2-input" placeholder="Account Number">
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-bank-name').value,
          account_number: document.getElementById('swal-account-number').value,
        };
      },
    });

    if (formValues) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/bank/create`,
          formValues,
          { headers: getAuthHeaders() }
        );

        if (response.data.status) {
          toast.success('Bank created successfully!');
          fetchBanks(); // Refresh List
        }
      } catch (error) {
        toast.error('Error creating bank');
        console.error('Error creating bank:', error);
      }
    }
  };

  // Delete a Bank with SweetAlert2 Confirmation
  const deleteBank = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/bank/delete`, {
          headers: getAuthHeaders(),
          data: { id: id },
        });

        if (response.data.status) {
          toast.success('Bank deleted successfully!');
          fetchBanks();
        }
      } catch (error) {
        toast.error('Error deleting bank');
      }
    }
  };

  return (
    <>
        
        <section class="content-header">
            <div class="container-fluid">
                <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary card-outline">
                    <div class="card-header">
                        <h3 class="card-title" style={{"font-weight":"bold","font-size":"28px"}}>
                        
                            Bank Account List
                        </h3>
                        <button className="btn btn-primary float-right" onClick={createBank}>
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banks.length > 0 ? (
                            banks.map((bank) => (
                                <tr key={bank.id}>
                                <td>{bank.name}</td>
                                <td>{bank.account_number}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteBank(bank.id)}>
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No banks available</td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                   
                    </div>
                </div>
                </div>
            </div>
        </section>
      
    </>
  );
};

export default Bank;
