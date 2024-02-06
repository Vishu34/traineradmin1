const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
// set port, listen for requests
const { PORT, MONGODB_URI, NODE_ENV, ORIGIN } = require("./config/config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors");

// routes
const trainerRoutes = require("./routes/trainer");
const studentRoutes = require("./routes/student");
const categoriesRoutes = require("./routes/categories");
const coursesRoutes = require("./routes/courses");
const trendingRoutes = require("./routes/trendingCourse");
const courseDetailsRoutes = require("./routes/courseDetails");
const notificationRoures = require("./routes/notification");

// init express app
const app = express();

// middlewares
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//const db = (query);

// const db = require("./models");
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

// simple route
app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

// routes middlewares

app.use("/api/student", studentRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/course-detail", courseDetailsRoutes);
app.use("/api/notification", notificationRoures);

// page not found error handling  middleware

app.use("/*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});

// global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});

async function main() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("database connected");

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
