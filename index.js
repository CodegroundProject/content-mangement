const express = require("express");
const connectDatabase = require("./config/database");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

// connect to the database
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./api/routes"))

app.get("/", (req, res) => {
  res.send("server running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (_) =>
  console.log(`server up and running on port ${PORT}`)
);
