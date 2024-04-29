import { refreshAccessToken } from '../refreshAccessToken.js';

export async function setupAxiosInterceptors(axiosApiInstance)
{
  axiosApiInstance.interceptors.response.use((response) => {
    return response;
  }, async error => {
      const originalRequest = error.config;
  
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        const refresh = await refreshAccessToken(refreshToken);
  
        if(refresh instanceof Error && refresh.response.status === 403)
        {
          window.location.href = "../login/login.html";
          window.alert("Your login session has expired. Please log in again.");
        }
        else
        {
          window.location.reload();
          window.alert("Session has expired. Undoing changes, please try again");
          return axiosApiInstance(originalRequest);
        }
      }
        
    return Promise.reject(error);
  });
}
