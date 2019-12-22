import axios from 'axios';
import authService from './auth-service';

class AxiosService {

  axiosInstance = {};

  constructor() {
    this.initInsatnce();
  }

  initInsatnce() {
    this.axiosInstance = axios.create({
      baseURL: '/api',
      timeout: 5000
    });


    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = authService.getToken();

        if(token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return this.axiosInstance;
  }

  getInstance () {
    return this.axiosInstance || this.initInsatnce();
  }
}

export default new AxiosService();
