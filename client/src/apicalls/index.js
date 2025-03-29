
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1001/api', // Set your base URL here
    headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
    }
});

export default axiosInstance;