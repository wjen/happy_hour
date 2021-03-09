import React, { createContext, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/auth/';

const AuthContext = createContext();

let initialState = null;

// check if token is expired
if (localStorage.getItem('user')) {
  // decode the expiration that is encoded in the token

  const decodedToken = jwt_decode(
    JSON.parse(localStorage.getItem('user')).accessToken
  );

  // get milliseconds and remove if expired
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('user');
  } else {
    initialState = JSON.parse(localStorage.getItem('user'));
  }

}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  if (message) {
    setTimeout( () => {
      setMessage('');
      setSuccessful(false);
    }, 3000)
  }
  const login = async (username, password) => {
    const response = await axios.post(`${API_URL}signin`, {
      username,
      password,
    });

    if (response.data.accessToken) {
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    console.log(response.data);
    return response.data;
  };

  const logOut = () => {
    localStorage.removeItem('user');
  };

  const register = async (username, email, password) => {
    return await axios.post(`${API_URL}signup`, {
      username,
      email,
      password,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logOut, getCurrentUser, message, setMessage, successful, setSuccessful }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
