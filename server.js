const express = require("express");
const path = require("path");
const forecastRouter = require("./routes/forecast.router");
const { PORT } = require("./config/secret");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Basic route
app.get("/", (req, res) => {
    res.render("index")
});

app.use("/forecast", forecastRouter);

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});
