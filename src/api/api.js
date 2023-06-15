import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Thay thế bằng URL API thực tế

const login = (email, password) => {
  return axios.post(`${API_URL}/users/login`, { email, password });
};

export { login };
