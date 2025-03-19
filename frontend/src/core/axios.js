import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../core/config';
import { toast } from 'react-toastify';

async function banker_call(endpoint, navigate) { 
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
            headers: getAuthHeaders(),
        });

        if (response.data.detail) {
            toast.error("Unauthenticated");
            navigate("/login");
            return false;
        }

        return response;
    } catch (error) {
        toast.error("Request failed");
        console.error("Error in banker_call:", error);
        return false;
    }
}

export default banker_call;
