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

    console.log('Access token:', accessToken)
    console.log('Refresh token:', refreshToken)

  } catch (error) {
    if (error.response.status === 401) {
      console.log('Invalid username or password')
    } 
    else {
      console.log('An error occurred. Please try again later.')
    }
  }

}

document.querySelector(".loginButton button").addEventListener('click', login);
