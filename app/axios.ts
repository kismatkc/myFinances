

import axios from 'axios';


const API = axios.create({
  baseURL: "http://localhost:4200/api"
  // baseURL: 'https://047f506f-4c2d-464f-98b3-3d25be80afd1-00-14ttlg9ajb0tp.spock.replit.dev:4200/api',
});



// export const setUpInterceptor = (getToken: ()=> Promise<string | null>) => {

//   API.interceptors.request.use(

//     async config => {

      // try {
        // const token = await getToken(); // Fetch the Clerk token
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
//         }
//       } catch (error) {
//         console.error('Error fetching Clerk token', error);
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   )
// }

export default API;