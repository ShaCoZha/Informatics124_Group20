import { refreshAccessToken } from './refreshAccessToken.jsx';
import axios from 'axios';

export async function setupAxiosInterceptors(axiosApiInstance)
{
  axiosApiInstance.interceptors.response.use((response) => {
    return response;
  }, async error => {
      const originalRequest = error.config;
  
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refresh = await refreshAccessToken();
  
        if(refresh instanceof Error && refresh.response.status === 403)
        {
          window.alert("Your login session has expired. Please log in again.");
          window.location.href = "./login";
        }
        else
        {
          window.alert("Session has expired. Undoing changes, please try again");
          window.location.reload();
          return axiosApiInstance(originalRequest);
        }
      }
        
    return Promise.reject(error);
  });
}