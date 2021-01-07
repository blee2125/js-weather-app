const BACKEND_URL = 'localhost:3000';
let zipcodeArray = []
let settingsArray = ["light"] //light is default
var currentUser = null;
var currentLocation = "";

function checkDark() {
  let darkModeCheck = (document.body.classList.value === "dark-mode")
  if (darkModeCheck) {
    settingsArray[0] = "dark"
  } else {
    settingsArray[0] = "light"
  }
}
function saveDarkMode() {
  checkDark();
  fetch(`http://${BACKEND_URL}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({username: currentUser.name, settings: settingsArray})
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

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
  .then(data => console.log(data))
  locationArray()
}

function locationArray() {
  zipcodeArray.forEach(listArray)
}
function listArray(value, index, array) {
  let zipcodeDropDown = document.querySelector("#zipcodes")
  let newOption = document.createElement("option")

  zipcodeDropDown.append(newOption)
  newOption.setAttribute("value", `${value}`)
}
function clearListArray() {
  document.getElementById("zipcodes").innerHTML = "";
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
    .then(loginData => {
      if (loginData.message === "Logged In") {
        toggleLogin(),
        currentUser = loginData.object,
        console.log(currentUser);
        zipcodeArray = currentUser.locations
        displayName.textContent = "hello, "+ currentUser.name;
        locationArray(listArray);
        if (currentUser.settings[0] === "dark") {
          document.body.classList.value = "dark-mode";
        } else if (currentUser.settings[0] === "light") {
          document.body.classList.value = "";
        }
      }
    })
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
    .then(signupData => {
      if (signupData.message === "Logged In") {
        toggleLogin();
        currentUser = signupData.object,
        console.log(currentUser);
        displayName.textContent = "name: "+ currentUser.name;
        saveDarkMode();
      }
    })
}
function logOut() {
  let buttons = document.querySelector("button#loginButton")
  fetch(`http://${BACKEND_URL}/logout`)
    .then(response => response.json())
    .then(logoutData => {
      if (logoutData.message === "Logged Out") {
        toggleLogin();
        zipcodeArray = [];
        settingsArray = [];
        clearListArray();
      }
      console.log(logoutData)
    })
    currentUser = null;
}

/*function newCard() {
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
  newH3.innerHTML = this.name
  newH2.setAttribute("class", "temperature")
  newH2.innerHTML = ''
  //newP.setAttribute("class", "description")
  //newP.innerHTML = "description"
}
*/
function toggleSomething(something) {
  let x = document.getElementById(something);
  if (x.style.display === 'none') {
    x.style.display = "unset";
  } else {
    x.style.display = "none";
  }
}
function toggleSettings() {
  let x = document.getElementById("settings");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function toggleDarkMode() {
  let element = document.body
  element.classList.toggle("dark-mode");
  saveDarkMode();
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