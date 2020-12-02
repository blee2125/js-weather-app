console.log("testing...123")
// test that we can get data from the backend
/*const BACKEND_URL = 'localhost:3000';
fetch(`http://${BACKEND_URL}/test`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));
*/

const cards = document.querySelector("body > div.cards")
const newDiv = document.createElement("div")
const newH3 = document.createElement("h3")
const newH2 = document.createElement("h2")
const newP = document.createElement("p")

cards.append(newDiv)
newDiv.append(newH3)
newDiv.append(newH2)
newDiv.append(newP)
newDiv.setAttribute("class", "card")
newH3.setAttribute("class", "city")
newH2.setAttribute("class", "temperature")
newH2.innerHTML = "new card"
newP.setAttribute("class", "description")




function seeTheWeather() {
  //gets zipcode from input
  var zipcode = document.getElementById("zipcode").value

  //alert(`zipcode is ${zipcode}`);

  let city = document.querySelector(".city")
  let temperature = document.querySelector(".temperature")
  let description = document.querySelector(".description")

  if (zipcode) {
    const api = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=imperial`

    fetch(api)
      .then(response =>{
        return response.json()
      })
      .then(data =>{
        console.log(data);
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
  var card = document.createElement('div.card');
  var city = document.createElement('h3')
  city.innerHTML = "new card name"
  card.appendChild(city);

  document.body.appendChild(card);
}

// enter/return button for zipcode field, must load after DOM
document.getElementById("zipcode").addEventListener("keyup", function(event) {
  if(event.key == "Enter") {
    event.preventDefault();
    document.querySelector("button#zipcodeButton").click();
  }
});