const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();

// Read ENV
dotenv.config();

// Connect Database
// connectDB();

// Init middleware
app
  .use(express.json({ extended: false }))
  .use(cors())
  .use(cookieParser());

app.get("/", (req, res) => res.send("API RUNNING"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/spotify", require("./routes/api/spotify"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
