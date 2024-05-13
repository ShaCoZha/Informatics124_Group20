import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export async function refreshAccessToken() {
  try {
    const response = await axios.post('http://localhost:3000/token/refreshToken', 
    {
      withCredentials: true
    },
    {
      
    }
    );
  } catch (error) {
    return error;
  }

}