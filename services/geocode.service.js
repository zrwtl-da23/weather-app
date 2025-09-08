require("dotenv").config();
const axios = require("axios");

async function geocode(place) {
  // Use OpenCage Geocoding
  const url = "https://api.opencagedata.com/geocode/v1/json";
  const { data } = await axios.get(url, {
    params: { q: place, key: process.env.OPENCAGE_API_KEY, limit: 1 }
  });
  if (!data.results?.length) return null;
  const best = data.results[0];
  return {
    name: best.formatted,
    lat: best.geometry.lat,
    lon: best.geometry.lng
  };
}

module.exports = { geocode };