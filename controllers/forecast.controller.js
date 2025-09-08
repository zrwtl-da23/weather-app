const { geocode } = require("../services/geocode.service");
const { getForecast } = require("../services/weather.service");

async function renderForecast(req, res) {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.status(400).render("forecast", { error: "Please enter a location.", location: null, current: null, hourly: null });

    const loc = await geocode(q);
    if (!loc) return res.status(404).render("forecast", { error: "Location not found.", location: null, current: null, hourly: null });

    const wx = await getForecast(loc.lat, loc.lon);

    const location = { name: loc.name, lat: loc.lat, lon: loc.lon };
    const current = wx.current ?? null;
    const hourly = wx.hourly ?? null;

    const weatherIcons = {
      0: "☀️",                           // Clear
      1: "☁️", 2: "☁️", 3: "☁️",          // Cloudy
      45: "🌫", 48: "🌫",                 // Fog
      51: "🌦", 53: "🌦", 55: "🌦",       // Drizzle
      56: "🌦", 57: "🌦",                 // Freezing drizzle
      61: "🌧", 63: "🌧", 65: "🌧",       // Rain
      66: "🌧", 67: "🌧",                 // Freezing rain
      71: "🌨", 73: "🌨", 75: "🌨",       // Snowfall
      77: "🌨",                          // Snow grains
      80: "🌧", 81: "🌧", 82: "🌧",       // Showers
      85: "🌨", 86: "🌨",                 // Snow showers
      95: "⛈", 96: "⛈", 99: "⛈"         // Thunderstorm
    };

    hourly.icons = hourly.weathercode.map(code => weatherIcons[code] || "❓");

    console.log(location);

    res.render("forecast", { error: null, location, current, hourly });
  } catch (err) {
    console.error(err.message);
    res.status(500).render("forecast", { error: "Something went wrong fetching weather.", location: null, current: null, hourly: null });
  }
}

module.exports = { renderForecast };
