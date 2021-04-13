class Weather{
  constructor(data) {
    this.icon = data.weather[0].icon;
    this.city = data.name;
    this.temperature = data.main.temp;
    this.feelsLike = data.main.feels_like;
    this.description = data.weather[0].description;
    this.windDirection = data.wind.deg;
    this.windSpeed  = data.wind.speed;
    this.windGust = data.wind.gust;
  }

  static getWeather(zipcode, units = "imperial") {
    const api = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=${units}`
    fetch(api)
      .then(response =>{return response.json()})
      .then(weatherData =>{
        console.log(weatherData)
        const newWeather = new Weather(weatherData)
        const lat = weatherData.coord.lat
        const lon = weatherData.coord.lon
        newWeather.renderWeather()
        this.getOneCallWeather(lat, lon, units)
      })
  }

  static getFiveDay(zipcode, units = "imperial"){
    const api = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=${units}`
    fetch(api)
      .then(response =>{return response.json()})
      .then(fiveDayData => console.log(fiveDayData))
  }
  static getOneCallWeather(lat, lon, units = "imperial"){
    //example- const api = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=8e96251acc0bcddc94b74de1c9fc5d22`
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=8e96251acc0bcddc94b74de1c9fc5d22&units=${units}`
    fetch(api)
      .then(response =>{return response.json()})
      .then(oneCall => console.log(oneCall))
  }

  degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }
  
  renderWeather() {
    if (settingsArray[1]=== "metric") {
      let icon = document.querySelector("#icon")
      const iconImage = this.icon
      icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconImage}@2x.png`)

      let city = document.querySelector(".city")
      const cityName = this.city
      city.textContent = cityName

      let temperature = document.querySelector(".temperature")
      const temperatureFloat = this.temperature
      const temperatureInt = Math.round(temperatureFloat)
      temperature.textContent = temperatureInt + " °c"

      const feelsLike = document.querySelector(".feels-like")
      const feelsLikeFloat = this.feelsLike
      const feelsLikeInt = Math.round(feelsLikeFloat)
      feelsLike.textContent = "Feels Like: " + feelsLikeInt + " °c"

      const description = document.querySelector(".description")
      const descriptionApi = this.description
      description.textContent = descriptionApi

      let windDirection = document.querySelector(".wind-direction")
      const windDirectionFloat = this.windDirection
      windDirection.textContent = "Wind Direction: " + windDirectionFloat + "°"

      let cardinalDirection = document.querySelector(".cardinal-direction")
      const nsew = this.degToCompass(windDirectionFloat)
      cardinalDirection.textContent = nsew

      let windSpeed = document.querySelector(".wind-speed")
      const windSpeedFloat = this.windSpeed
      const windSpeedInt = Math.round(windSpeedFloat)
      const windSpeedMetric = Math.round(windSpeedInt * 3.6)
      windSpeed.textContent = "Wind Speed: " + windSpeedMetric + " km/h"

      let windGust = document.querySelector(".wind-gust")
        if (this.windGust) {
          const windGustFloat = this.windGust
          const windGustInt = Math.round(windGustFloat)
          const windGustMetric = Math.round(windGustInt * 3.6)
          windGust.textContent = "Wind Gust: " + windGustMetric + " km/h"
        } else {
          windGust.textContent = "No Wind Gust"
        }

    } else if (settingsArray[1]=== "imperial") {

      let icon = document.querySelector("#icon")
      const iconImage = this.icon
      icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconImage}@2x.png`)

      let city = document.querySelector(".city")
      const cityName = this.city
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

      let cardinalDirection = document.querySelector(".cardinal-direction")
      const nsew = this.degToCompass(windDirectionFloat)
      cardinalDirection.textContent = nsew

      let windSpeed = document.querySelector(".wind-speed")
      const windSpeedFloat = this.windSpeed
      const windSpeedInt = Math.round(windSpeedFloat)
      windSpeed.textContent = "Wind Speed: " + windSpeedInt + " mph"

      let windGust = document.querySelector(".wind-gust")
        if (this.windGust) {
          const windGustFloat = this.windGust
          const windGustInt = Math.round(windGustFloat)
          windGust.textContent = "Wind Gust: " + windGustInt + " mph"
        } else {
          windGust.textContent = "No Wind Gust"
        }

    }

  }
}