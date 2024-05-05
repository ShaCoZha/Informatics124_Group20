import 'axios';

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

    },
    {
      
    }
    );

  const newAccessToken = response.data.accessToken;
  const newRefreshToken = response.data.refreshToken;

  localStorage.setItem('accessToken', newAccessToken);
  localStorage.setItem('refreshToken', newRefreshToken);

  } catch (error) {
    return error;
  }

}