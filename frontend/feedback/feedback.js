async function submitFeedback() {
    var name = document.getElementById("name").value;
    var feedbackType = document.getElementById("type").value;
    var feedback = document.getElementById("feedbackBox").value;

    if(name == "")
  {
    window.alert("Please enter a display name");
      return;
  }

  if(feedbackType == "Select")
  {
    window.alert("Please select an option");
      return;
  }
    
  window.alert("Thank you for your feedback!");
  
  }
  
  document.querySelector(".submitButton button").addEventListener('click', submitFeedback);
  