console.log("testing...123")
// test that we can get data from the backend
const BACKEND_URL = 'localhost:3000';
fetch(`http://${BACKEND_URL}/test`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

function seeTheWeather() {
  //gets zipcode from input
  var zipcode = document.getElementById("zipcode").value

  //alert(`zipcode is ${zipcode}`);

  let city = document.querySelector(".city")
  let temperature = document.querySelector(".temperature")

  if (zipcode) {
    const api = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=imperial`

    fetch(api)
      .then(response =>{
        return response.json()
      })
      .then(data =>{
        console.log(data);
        const cityName = data.name
        const temperatureFloat = data.main.temp
        const temperatureInt = Math.round(temperatureFloat)
        city.textContent = cityName
        temperature.textContent = temperatureInt + " °f"
      })
  }

}

// enter/return button for zipcode field, must load after DOM
document.getElementById("zipcode").addEventListener("keyup", function(event) {
  if(event.key == "Enter") {
    event.preventDefault();
    document.querySelector("button#zipcodeButton").click();
  }
});