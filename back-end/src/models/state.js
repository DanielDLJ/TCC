const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = db.sequelize.define(
  "state",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sigla: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    center_lat: {
      type: Sequelize.DECIMAL(18, 15),
      allowNull: false,
    },
    center_lng: {
      type: Sequelize.DECIMAL(18, 15),
      allowNull: false,
    },
  },
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: "state",
  }
);
