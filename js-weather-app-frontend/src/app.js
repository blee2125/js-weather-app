
function getWeather(zipcode) {
  const api = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=imperial`

  fetch(api)
    .then(response =>{return response.json()})
    .then(data =>{
      console.log(data)

    })
}

function seeTheWeather() {
    let zipcode = document.getElementById("zipcode").value
  
    if (zipcode) {
      const api = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=imperial`
      fetch(api)
        .then(response =>{
          return response.json()
        })
        .then(data =>{
          console.log(data)
          let icon = document.querySelector("#icon")
          const iconImage = data.weather[0].icon
          icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconImage}@2x.png`)

          let city = document.querySelector(".city")
          const cityName = data.name
          city.textContent = cityName

          let temperature = document.querySelector(".temperature")
          const temperatureFloat = data.main.temp
          const temperatureInt = Math.round(temperatureFloat)
          temperature.textContent = temperatureInt + " °f"

          let feelsLike = document.querySelector(".feels-like")
          const feelsLikeFloat = data.main.feels_like
          const feelsLikeInt = Math.round(feelsLikeFloat)
          feelsLike.textContent = "Feels Like: " + feelsLikeInt + " °f"

          let description = document.querySelector(".description")
          const descriptionApi = data.weather[0].description
          description.textContent = descriptionApi
          
          let windDirection = document.querySelector(".wind-direction")
          const windDirectionFloat = data.wind.deg
          windDirection.textContent = "Wind Direction: " + windDirectionFloat + "°"

          let windSpeed = document.querySelector(".wind-speed")
          const windSpeedFloat = data.wind.speed
          const windSpeedInt = Math.round(windSpeedFloat)
          windSpeed.textContent = "Wind Speed: " + windSpeedInt + "°"

          let windGust = document.querySelector(".wind-gust")
          const windGustFloat = data.wind.gust
          const windGustInt = Math.round(windGustFloat)
          windGust.textContent = "Wind Gust: " + windGustInt + "°"
        })
    }
}