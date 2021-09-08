const Sequelize = require("sequelize");
const db = require("../config/database");
const State = require("./state");

const City = db.sequelize.define(
  "city",
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
    stateID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    center_lat: {
      type: Sequelize.DECIMAL(18, 15),
      allowNull: true,
    },
    center_lng: {
      type: Sequelize.DECIMAL(18, 15),
      allowNull: true,
    },
  },
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: "city",
  }
);

// State.hasMany(City, { foreignKey: 'stateID' });
// City.belongsTo(State, { foreignKey: 'stateID', targetKey: 'id' });

module.exports = City;
