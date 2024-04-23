export async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post('http://localhost:3000/token/refreshToken', 
    {

    },
    {
      headers: {
        authorization: `Bearer ${refreshToken}`,
      }
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