import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/';

const getAllUsers = async () => {
  const response = await axios.get(API_URL + 'admin/users', {
    headers: authHeader(),
  });
  return response;
};

export { getAllUsers };
