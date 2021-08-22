const express = require("express");
const cors = require("cors");
const HttpError = require("./util/HttpError");
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");
const { sequelize } = require("./models");

const app = express();

const PORT = process.env.PORT || 3000;

// It parses incoming requests with JSON payloads, urlencoded payloads and is based on body-parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.use((req, res, next) => {
  const error = new HttpError("Something went wrong.", 500);
  return next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT);
    console.log(`Server up on http://localhost:${PORT}`);
  })
  .catch((err) => console.log(err));
