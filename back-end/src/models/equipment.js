const Sequelize = require('sequelize')
const db = require('../config/database')
const User = require('./user');
const City = require('./city');
const State = require('./state');

const Equipment = db.sequelize.define('equipment',{
    deviceEUI: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    userID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lat:{
        type: Sequelize.DECIMAL(18,15),
        allowNull: false
    },
    lng:{
        type: Sequelize.DECIMAL(18,15),
        allowNull: false
    },
    cityID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stateID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
},{
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'equipment'}
)

User.hasMany(Equipment, { foreignKey: 'userID' });
Equipment.belongsTo(User, { foreignKey: 'userID', targetKey: 'id' });

City.hasMany(Equipment, { foreignKey: 'cityID' });
Equipment.belongsTo(City, { foreignKey: 'cityID', targetKey: 'id' });

State.hasMany(Equipment, { foreignKey: 'stateID' });
Equipment.belongsTo(State, { foreignKey: 'stateID', targetKey: 'id' });

module.exports = Equipment