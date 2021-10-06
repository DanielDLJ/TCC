const Sequelize = require('sequelize')
const db = require('../config/database')
const Equipment = require('./equipment');
const moment = require('moment');

const Equipment_data = db.sequelize.define('equipment_data',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    deviceEUI: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ph:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    turbidity:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        // allowNull: false,
        // defaultValue: Sequelize.NOW
        get: function() {
            return moment(this.getDataValue('date')).format('YYYY-MM-DD HH:mm:ss')
         }
    },
},{
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'equipment_data'}
)
Equipment.hasMany(Equipment_data, { foreignKey: 'deviceEUI' });
Equipment_data.belongsTo(Equipment, { foreignKey: 'deviceEUI', targetKey: 'deviceEUI' });

module.exports = Equipment_data