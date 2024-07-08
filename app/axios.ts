

import axios from 'axios';


const API = axios.create({
  // baseURL: "http://localhost:4200/api"
  baseURL: 'https://e2143fc0-80b7-4673-be2b-e4ef443ebf75-00-3hi4kbvy85s60.worf.replit.dev:4200/api',
});



export const setUpInterceptor = (getToken: ()=> Promise<string | null>) => {

  API.interceptors.request.use(

    async config => {

      try {
        const token = await getToken(); // Fetch the Clerk token
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error fetching Clerk token', error);
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )
}

export default API;