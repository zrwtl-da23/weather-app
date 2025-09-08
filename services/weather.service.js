const axios = require("axios");

async function getForecast(lat, lon) {
  // Open-Meteo: current + hourly (temperature, wind, etc.)
  const url = "https://api.open-meteo.com/v1/forecast";
  const { data } = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lon,
      current: "temperature_2m,wind_speed_10m,relative_humidity_2m,weathercode",
      hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode"
    }
  });
  return data;
}

module.exports = { getForecast };
