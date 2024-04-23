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

    document.getElementById('displayName').value = response.data.displayName;
    document.getElementById('year').value = response.data.year;
    document.getElementById('department').value = response.data.department;
    document.getElementById('major').value = response.data.major;
  }
  catch(error)
  {
    console.log(error)
  }

}

async function changeProfile() {
  const accessToken = localStorage.getItem('accessToken');
  const displayName = document.getElementById("displayName").value;
  const year = document.getElementById("year").value;
  const department = document.getElementById("department").value;
  const major = document.getElementById("major").value;
  
  try
  {
    const response = await axiosApiInstance.post('http://localhost:3000/user/updateUserProfile', {
      displayName: displayName,
      year: year,
      department: department,
      major: major
    }, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      }
    }
    );
    window.location.href = "../profile/profile.html";
  }
  catch(error)
  {
    console.log(error)
  }

}

document.addEventListener('DOMContentLoaded', function () {
  fetchUserProfile();
});

document.querySelector(".change button").addEventListener('click', changeProfile);
