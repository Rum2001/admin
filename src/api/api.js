import axios from 'axios';

const API_URL = 'https://api.boxvlu.click/api'; // Thay thế bằng URL API thực tế

const login = (email, password) => {
  return axios.post(`${API_URL}/users/login`, { email, password });
};

export { login };
