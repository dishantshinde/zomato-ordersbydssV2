const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const cors = require("cors");
const afunc = require("./createDatabase");

// Parse JSON bodies (as sent by API clients)
afunc();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "https://zomato-ordersbydssv2-2.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests with no origin
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const connection = require("./connector");

// Welcome page route
app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send("<h1>Welcome to zomato orders Website!</h1>");
});

// Get all orders route
app.get("/api/orders", (req, res) => {
  const query = "SELECT * FROM orders";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(results);
  });
});

// Get orders with pagination route
app.get("/api/orders/:limit/:skip", (req, res) => {
  let parsedLimit = parseInt(req.params.limit);
  let parsedskip = parseInt(req.params.skip);
  if (
    isNaN(parsedLimit) ||
    isNaN(parsedskip) ||
    parsedLimit < 0 ||
    parsedskip < 0
  ) {
    parsedLimit = 10;
    parsedskip = 0;
  }
  const query = "SELECT * FROM orders LIMIT ? OFFSET ?";
  connection.query(query, [parsedLimit, parsedskip], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(result);
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
