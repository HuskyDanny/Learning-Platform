const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");
require("dotenv").config();

const DBPORT = process.env.DBPORT || 27017;
const APIPORT = process.env.APIPORT || 3000;

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect("mongodb://localhost:" + DBPORT + "/project", {
    useNewUrlParser: true
  })
  .then(() => console.log("connected"))
  .catch(error => console.error(error));

app = express();
app.use(express.json());
app.use(
  session({
    secret: "nowaytocheatonthisdouchybag",
    resave: true,
    saveUninitialized: true
  })
);
app.use(require("./routes"));
//Error handling middleware
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(403).send({
      success: false,
      message: "Token is Incorrect"
    });
  }
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

//Listening port
app.listen(APIPORT, () => {
  console.log(`Listening on ${APIPORT}`);
});
