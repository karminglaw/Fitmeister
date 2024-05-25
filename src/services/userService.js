import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users';

const register = (username, email, password) => {
  return axios.post(API_URL + '/register', {
    username,
    email,
    password
  });
};

const login = (email, password) => {
  return axios.post(API_URL + '/login', {
    email,
    password
  });
};

export default {
  register,
  login
};
