const { Router } = require("express");
const { renderForecast } = require("../controllers/forecast.controller");
const router = Router();

// GET /forecast?q=city
router.get("/", renderForecast);

module.exports = router;
