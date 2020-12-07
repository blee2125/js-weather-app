const BACKEND_URL = 'localhost:3000';

let zipcodeArray = []



function logIn() {
  let username = document.getElementById("login").value
  let password = document.getElementById("password").value

  console.log({username: username, password: password})

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

  console.log({username: username, password: password})

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


function seeTheWeather() {
  //gets zipcode from input
  let zipcode = document.getElementById("zipcode").value

  //alert(`zipcode is ${zipcode}`);

  if (zipcode) {
    const api = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=imperial`
    //zipcodeArray.unshift(zipcode)
    //console.log(zipcodeArray)
    fetch(api)
      .then(response =>{
        return response.json()
      })
      .then(data =>{
        //console.log(data);
        newCard();
        let city = document.querySelector(".city")
        let temperature = document.querySelector(".temperature")
        let description = document.querySelector(".description")
        const cityName = data.name
        city.textContent = cityName
        const temperatureFloat = data.main.temp
        const temperatureInt = Math.round(temperatureFloat)
        temperature.textContent = temperatureInt + " °f"
        const descriptionApi = data.weather[0].description
        description.textContent = descriptionApi
      })
  }
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