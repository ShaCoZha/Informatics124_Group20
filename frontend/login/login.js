async function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  axios.interceptors.request.use(
    (config) => {
      config.withCredentials = true
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  try {
    const response = await axios.post('http://localhost:3000/user/login', {
      name: username,
      password: password
    });

    window.location.href = '../profile/profile.html'

  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.alert('Invalid username or password')
    } 
    else {
      window.alert('An error occurred. Please try again later.')
    }
  }

}

document.querySelector(".loginButton button").addEventListener('click', login);
