let zipcodeArray = []
let settingsArray = []

function saveLocation() {

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
          console.log(data)
          let icon = document.querySelector(".icon")
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