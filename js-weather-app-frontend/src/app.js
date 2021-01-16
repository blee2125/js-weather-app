class Weather{
  constructor(data) {
    this.icon = data.weather[0].icon;
    this.city = data.city;
    this.temperature = data.main.temp;
    this.feelsLike = data.main.feels_like;
    this.description = data.weather[0].description;
    this.windDirection = data.wind.deg;
    this.windSpeed  = data.wind.speed;
    this.windGust = data.wind.windGust;
  }

  static getWeather(zipcode) {
    const api = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=imperial`
    fetch(api)
      .then(response =>{return response.json()})
      .then(newW =>{
        console.log(newW)
        const newWeather = new Weather(newW)
        newWeather.renderWeather()
      })
  }
  
  renderWeather() {
    let icon = document.querySelector("#icon")
    const iconImage = this.icon
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconImage}@2x.png`)

    let city = document.querySelector(".city")
    const cityName = this.name
    city.textContent = cityName

    let temperature = document.querySelector(".temperature")
    const temperatureFloat = this.temperature
    const temperatureInt = Math.round(temperatureFloat)
    temperature.textContent = temperatureInt + " °f"

    const feelsLike = document.querySelector(".feels-like")
    const feelsLikeFloat = this.feelsLike
    const feelsLikeInt = Math.round(feelsLikeFloat)
    feelsLike.textContent = "Feels Like: " + feelsLikeInt + " °f"

    const description = document.querySelector(".description")
    const descriptionApi = this.description
    description.textContent = descriptionApi

    let windDirection = document.querySelector(".wind-direction")
    const windDirectionFloat = this.windDirection
    windDirection.textContent = "Wind Direction: " + windDirectionFloat + "°"

    let windSpeed = document.querySelector(".wind-speed")
    const windSpeedFloat = this.windSpeed
    const windSpeedInt = Math.round(windSpeedFloat)
    windSpeed.textContent = "Wind Speed: " + windSpeedInt + "mph"

    let windGust = document.querySelector(".wind-gust")
      if (this.windGust) {
        const windGustFloat = this.windGust
        const windGustInt = Math.round(windGustFloat)
        windGust.textContent = "Wind Gust: " + windGustInt + "mph"
      } else {
        windGust.textContent = "No Wind Gust"
      }

  }
}