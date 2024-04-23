import { setupAxiosInterceptors } from '../verifyToken.js';
const axiosApiInstance = axios.create();
setupAxiosInterceptors(axiosApiInstance);

async function fetchUserProfile() {
  const accessToken = localStorage.getItem('accessToken');

  try
  {
    const response = await axiosApiInstance.get('http://localhost:3000/user/getUserProfile', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      }
    }
    );

    document.getElementById('displayNameField').textContent = response.data.displayName;
    document.getElementById('yearField').textContent = response.data.year;
    document.getElementById('departmentField').textContent = response.data.department;
    document.getElementById('majorField').textContent = response.data.major;
  }
  catch(error)
  {
    console.log(error)
  }

}

function changeProfile() {
  window.location.href = "../profile_change/profileChange.html";
}

document.addEventListener('DOMContentLoaded', function () {
  fetchUserProfile();
});

document.querySelector(".change button").addEventListener('click', changeProfile);