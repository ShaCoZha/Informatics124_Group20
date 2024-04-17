async function register() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var passwordConfirm = document.getElementById("confirmPassword").value;

  try {

    if(password !== 
      passwordConfirm) {
        window.alert("Passwords don't match. Please enter the same password in both fields.");
        return;
      }

    const response = await axios.post('http://localhost:3000/user/createUser', {
      name: username,
      password: password,
      role: "user"
    });

    console.log(response.data);

  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Invalid username or password');
    } 
    else {
      console.log(error);
      console.log('An error occurred. Please try again later.');
    }
  }

}

document.querySelector(".registerButton button").addEventListener('click', register);
