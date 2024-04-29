async function register() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  var passwordConfirm = document.getElementById("confirmPassword").value;
  var displayName = document.getElementById("displayName").value;
  var year = document.getElementById("year").value;
  var department = document.getElementById("department").value;
  var major = document.getElementById("major").value;

  try {

    var passwordRegex = /^[a-zA-Z0-9_-]{6,20}$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(username == "")
    {
      window.alert("Please enter a user name");
        return;
    }

    if(!emailRegex.test(email)) {
      window.alert("Invalid email address.");
      return;
    }

    if(!passwordRegex.test(password))
    {
      window.alert("Password must be between 6 to 20 characters long and contain only letters, numbers, underscores, or hyphens");
      return;
    }

    if(password !== 
      passwordConfirm) {
        window.alert("Passwords don't match. Please enter the same password in both fields.");
        return;
      }

    if(displayName == "")
    {
      window.alert("Please enter a display name");
        return;
    }

    if(year == "Select")
    {
      window.alert("Please select an option");
        return;
    }

    if(department == "Select")
    {
      window.alert("Please select an option");
        return;
    }

    if(major == "")
    {
      window.alert("Please enter an major");
        return;
    }

    const response = await axios.post('http://localhost:3000/user/createUser', {
      email: email,
      name: username,
      password: password,
      displayName: displayName,
      year: year,
      department : department,
      major : major,
      role: "user"
    });

    window.alert("User Created!")
    window.location.href = '../login/login.html'

  } catch (error) {
    if (error.response && error.response.status === 400) {
      window.alert('User already exist');
    } 
    else {
      console.log(error);
      window.alert('An error occurred. Please try again later.');
    }
  }

}

document.querySelector(".registerButton button").addEventListener('click', register);
