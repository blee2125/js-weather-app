class Weather{
  constructor(icon, city, temperature, feelsLike, description, windDirection, windSpeed, windGust) {
    this.icon = icon;
    this.city = city;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.description = description;
    this.windDirection = windDirection;
    this.windSpeed  = windSpeed;
    this.windGust = windGust;
  }

  getWeather(zipcode) {
    const api = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=imperial`
    fetch(api)
      .then(response =>{return response.json()})
      .then(newWeather =>{
        console.log(newWeather)
        this.renderWeather(newWeather)
      })
  }
  
  renderWeather(newWeather) {
    let icon = document.querySelector("#icon")
    const iconImage = newWeather.weather[0].icon
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconImage}@2x.png`)

    let city = document.querySelector(".city")
    const cityName = newWeather.name
    city.textContent = cityName

    let temperature = document.querySelector(".temperature")
    const temperatureFloat = newWeather.main.temp
    const temperatureInt = Math.round(temperatureFloat)
    temperature.textContent = temperatureInt + " °f"

    const feelsLike = document.querySelector(".feels-like")
    const feelsLikeFloat = newWeather.main.feels_like
    const feelsLikeInt = Math.round(feelsLikeFloat)
    feelsLike.textContent = "Feels Like: " + feelsLikeInt + " °f"

    const description = document.querySelector(".description")
    const descriptionApi = newWeather.weather[0].description
    description.textContent = descriptionApi

    let windDirection = document.querySelector(".wind-direction")
    const windDirectionFloat = newWeather.wind.deg
    windDirection.textContent = "Wind Direction: " + windDirectionFloat + "°"

    let windSpeed = document.querySelector(".wind-speed")
    const windSpeedFloat = newWeather.wind.speed
    const windSpeedInt = Math.round(windSpeedFloat)
    windSpeed.textContent = "Wind Speed: " + windSpeedInt + "mph"

    let windGust = document.querySelector(".wind-gust")
      if (newWeather.wind.gust) {
        const windGustFloat = newWeather.wind.gust
        const windGustInt = Math.round(windGustFloat)
        windGust.textContent = "Wind Gust: " + windGustInt + "mph"
      } else {
        windGust.textContent = "No Wind Gust"
      }

  }

  /*
  theWeather() {
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
          windSpeed.textContent = "Wind Speed: " + windSpeedInt + "mph"

          let windGust = document.querySelector(".wind-gust")
          if (data.wind.gust) {
            const windGustFloat = data.wind.gust
            const windGustInt = Math.round(windGustFloat)
            windGust.textContent = "Wind Gust: " + windGustInt + "mph"
          } else {
            windGust.textContent = "No Wind Gust"
          }
      })
    }
  }
  */

}


// a Weather class
// const newWeather= new Weather(attribute)
//  newWeather.render()