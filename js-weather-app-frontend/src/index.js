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
    .then(parsedResponse => console.log(parsedResponse))
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
    .then(parsedResponse => console.log(parsedResponse))
}

function logOut() {
  let buttons = document.querySelector("button#loginButton")
  fetch(`http://${BACKEND_URL}/logout`)
    .then(response => response.json())
    .then(parsedResponse => console.log(parsedResponse))
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