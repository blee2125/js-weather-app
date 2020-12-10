const BACKEND_URL = 'localhost:3000';

function logIn() {
  let username = document.getElementById("login").value
  let password = document.getElementById("password").value

  fetch(`http://${BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({username: username, password: password})
  })
    .then(response => response.json())
    .then(parsedResponse => {
      if (parsedResponse.message === "Logged In") {
        toggleLogin();
      }
      console.log(parsedResponse)
    })
}

function toggleLogin() {
  let username = document.getElementById("login")
  let password = document.getElementById("password")
  let loginButton = document.getElementById("loginButton")
  let signupButton = document.getElementById("signupButton")
  let logoutButton = document.getElementById("logoutButton")
  let displayName = document.getElementById("displayName")

  username.classList.toggle("disappear");
  password.classList.toggle("disappear");
  loginButton.classList.toggle("disappear");
  signupButton.classList.toggle("disappear");
  toggleSomething("logoutButton");
  toggleSomething("displayName");

}

function signUp() {
  let username = document.getElementById("login").value
  let password = document.getElementById("password").value

  fetch(`http://${BACKEND_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({username: username, password: password})
  })
    .then(response => response.json())
    .then(parsedResponse => {
      if (parsedResponse.message === "Logged In") {
        toggleLogin();
      }
      console.log(parsedResponse)
    })
}

function logOut() {
  let buttons = document.querySelector("button#loginButton")
  fetch(`http://${BACKEND_URL}/logout`)
    .then(response => response.json())
    .then(parsedResponse => {
      if (parsedResponse.message === "Logged Out") {
        toggleLogin();
      }
      console.log(parsedResponse)
    })
}

function newCard() {
  const newCards = document.querySelector("body > div.cards")
  const newDiv = document.createElement("div")
  const newH3 = document.createElement("h3")
  const newH2 = document.createElement("h2")
  const newP = document.createElement("p")

  newCards.append(newDiv)
  newDiv.append(newH3)
  newDiv.append(newH2)
  newDiv.append(newP)
  newDiv.setAttribute("class", "card")
  newH3.setAttribute("class", "city")
  newH3.innerHTML = "new card"
  newH2.setAttribute("class", "temperature")
  newH2.innerHTML = "new card"
  newP.setAttribute("class", "description")
  newP.innerHTML = "new card"
}
function toggleSomething(something) {
  var x = document.getElementById(something);
  if (x.style.display === 'none') {
    x.style.display = "unset";
  } else {
    x.style.display = "none";
  }
}
function toggleSettings() {
  var x = document.getElementById("settings");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function toggleDarkMode() {
  var element = document.body
  element.classList.toggle("dark-mode");
}

// enter/return button for zipcode field, must load after DOM
document.getElementById("zipcode").addEventListener("keyup", function(event) {
  if(event.key == "Enter") {
    event.preventDefault();
    document.querySelector("button#zipcodeButton").click();
  }
});
document.getElementById("password").addEventListener("keyup", function(event) {
  if(event.key == "Enter") {
    event.preventDefault();
    document.querySelector("button#loginButton").click();
  }
});