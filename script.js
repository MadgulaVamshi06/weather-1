let btn = document.getElementById("button");
btn.addEventListener("click", () => {
  getMapdata();
    let cityName = document.getElementById("cityName").value;
  let iframeCity = document.getElementById("gmap_canvas");
  iframeCity.src = `https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`
});

async function getMapdata() {
  try {
    let cityName = document.getElementById("cityName").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ad9fe103745fcc285b86a7e1fc80dad1`;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    displaydata(data);
  } catch (error) {
    console.log("error Occured");
  }
}

function displaydata(data) {
  let weatherContainer = document.getElementById("api_data");
  weatherContainer.innerHTML = "";

  const dateTime = new Date(data.dt * 1000).toLocaleString();
  const tempCelsius = kelvinToCelsius(data.main.temp);
  const feels_like = kelvinToCelsius(data.main.feels_like);
  const breeze = defineBreeze(data.wind.speed);
  const windDirection = defineWindDirection(data.wind.deg);
  const visibilityKilometers = metersToKilometers(data.visibility);

  const weatherInfo = `
<p>${dateTime}</p>
<h2>${data.name + ", " + data.sys.country}</h2>
<h2><span>&#9729;</span>${""} ${tempCelsius} °C</h2> 
<h4>Feels Like: ${feels_like} °C , ${data.weather[0].description} , ${breeze}</h4>
<p> &#x21E8; ${data.wind.speed} m/s ${windDirection}  &#x1F321;${data.main.pressure} hPa</p> 
<p>Humidity: ${data.main.humidity}%   Visibility: ${visibilityKilometers} km</p>

`;
  weatherContainer.innerHTML = weatherInfo;
}

function kelvinToCelsius(tempKelvin) {
  return (tempKelvin - 273.15).toFixed(2);
}

function defineBreeze(windSpeed) {
  if (windSpeed < 1.5) {
    return "Calm";
  } else if (windSpeed >= 1.5 && windSpeed < 3.4) {
    return "Light breeze";
  } else if (windSpeed >= 3.4 && windSpeed < 5.5) {
    return "Gentle breeze";
  } else if (windSpeed >= 5.5 && windSpeed < 7.9) {
    return "Moderate breeze";
  } else if (windSpeed >= 7.9 && windSpeed < 10.7) {
    return "Fresh breeze";
  } else if (windSpeed >= 10.7 && windSpeed < 13.8) {
    return "Strong breeze";
  } else if (windSpeed >= 13.8 && windSpeed < 17.1) {
    return "Moderate gale";
  } else if (windSpeed >= 17.1 && windSpeed < 20.7) {
    return "Fresh gale";
  } else if (windSpeed >= 20.7 && windSpeed < 24.4) {
    return "Strong gale";
  } else if (windSpeed >= 24.4 && windSpeed < 28.4) {
    return "Whole gale";
  } else if (windSpeed >= 28.4 && windSpeed < 32.6) {
    return "Storm";
  } else {
    return "Hurricane";
  }
}

function defineWindDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

function metersToKilometers(visibility) {
  return (visibility / 1000).toFixed(2); 
}