import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL: 'http://18.223.169.83:3001',//AWS
});

// api.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorisation');
// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

api.interceptors.response.use((response) => {
  if (response.data.error) {
    // throw response;
    return response;
  } else {
    return response;
  }
});

export default api;