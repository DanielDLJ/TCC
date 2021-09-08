const express = require("express");
const Cors = require("cors");
const db = require("./config/database");
var bodyParser = require("body-parser");

class App {
  constructor() {
    this.server = express();
    this.server.use(Cors());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());

    this.routes();
  }

  routes() {
    this.server.use("/", require("./routes/home"));
    this.server.use("/user", require("./routes/user"));
    this.server.use("/auth", require("./routes/auth"));
    this.server.use("/city", require("./routes/city"));
    this.server.use("/state", require("./routes/state"));
    this.server.use("/auxRoute", require("./routes/auxRoute"));
    this.server.use("/equipmentData", require("./routes/equipmentData"));

    //Error
    this.server.use((req, res, next) => {
      const error = new Error("Not found");
      error.status = 404;
      next(error);
    });

    this.server.use((error, req, res, next) => {
      res.status(error.status || 500);
      if (error.code != undefined) {
        res.json({
          error: {
            message: error.message,
            code: error.code,
          },
        });
      } else {
        res.json({
          error: {
            message: error.message,
          },
        });
      }
    });
  }
}

module.exports = new App().server;
