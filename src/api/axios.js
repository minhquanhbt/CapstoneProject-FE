import axios from 'axios';
import cookies from 'axios/lib/helpers/cookies'

const instance = axios.create({
//   baseURL: process.browser ? process.env.BROWSER_API_URL : require('../../config/next').SERVER_API_URL,
    baseURL: 'http://127.0.0.1/api',
    port: 80,
    timeout: 5000,
    headers: {
        'X-XSRF-TOKEN': cookies.read('XSRF-TOKEN'),
    },
})

instance.interceptors.request.use(async (config) => {
    const token = JSON.parse(localStorage.getItem("user-info"))?.token;
  
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

instance.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      throw error;
    }
 );

export default instance