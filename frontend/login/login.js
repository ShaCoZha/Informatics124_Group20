async function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  try {
    const response = await axios.post('http://localhost:3000/user/login', {
      name: username,
      password: password
    });

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    window.location.href = '../profile/profile.html'

  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Invalid username or password')
    } 
    else {
      console.log('An error occurred. Please try again later.')
    }
  }

}

document.querySelector(".loginButton button").addEventListener('click', login);
