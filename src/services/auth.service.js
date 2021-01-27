import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (username, email, password) => {
  return await axios.post(`${API_URL}signup`, {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}signin`, {
    username,
    password,
  });

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const logOut = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export { register, login, logOut, getCurrentUser };
