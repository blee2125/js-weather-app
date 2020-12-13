const BACKEND_URL = 'localhost:3000';
let zipcodeArray = []
let settingsArray = []
var currentUser = null;

function saveLocation() {
  let zipcode = document.getElementById("zipcode").value
  zipcodeArray.push(zipcode)

  fetch(`http://${BACKEND_URL}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({username: currentUser.name, locations: zipcodeArray, settings: currentUser.settings})
  })
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse))
  //zipcodeArray.forEach(newCard);
}

function locationArray() {
  zipcodeArray.forEach(getWeather)
}

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
        toggleLogin(),
        currentUser = parsedResponse.object,
        console.log(currentUser);
        zipcodeArray = currentUser.locations
        displayName.textContent = "name: "+ currentUser.name;
      }
    })
    seeTheWeather();
}

function toggleLogin() {
  let username = document.getElementById("login")
  let password = document.getElementById("password")
  let loginButton = document.getElementById("loginButton")
  let signupButton = document.getElementById("signupButton")
  let logoutButton = document.getElementById("logoutButton")
  let displayName = document.getElementById("displayName")
  let saveButtton = document.getElementById("saveButtton")

  username.classList.toggle("disappear");
  password.classList.toggle("disappear");
  loginButton.classList.toggle("disappear");
  signupButton.classList.toggle("disappear");
  toggleSomething("saveButtton");
  toggleSomething("logoutButton");
  toggleSomething("displayName");
  //displayName.textContent = "name: "+ currentUser.name
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
        currentUser = parsedResponse.object,
        console.log(currentUser);
        displayName.textContent = "name: "+ currentUser.name;
      }
    })
}

function logOut() {
  let buttons = document.querySelector("button#loginButton")
  fetch(`http://${BACKEND_URL}/logout`)
    .then(response => response.json())
    .then(parsedResponse => {
      if (parsedResponse.message === "Logged Out") {
        toggleLogin();
        zipcodeArray = [];
        settingsArray = [];
      }
      console.log(parsedResponse)
    })
    currentUser = null;
}

function newCard(value, index, array) {
  const newCards = document.querySelector("body > div.cards")
  const newDiv = document.createElement("div")
  const newH3 = document.createElement("h3")
  const newH2 = document.createElement("h2")
  //const newP = document.createElement("p")

  newCards.append(newDiv)
  newDiv.append(newH3)
  newDiv.append(newH2)
  //newDiv.append(newP)
  newDiv.setAttribute("class", "card")
  newH3.setAttribute("class", "city")
  newH3.innerHTML = +value
  newH2.setAttribute("class", "temperature")
  newH2.innerHTML = ''
  //newP.setAttribute("class", "description")
  //newP.innerHTML = "description"
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