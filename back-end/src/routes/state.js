var express = require("express");
var router = express.Router();
var State = require("../models/state");
var City = require("../models/city");
var DataEstados = require("../data/estados/estados.json");
var GetCitiesByState = require('../util/GetCitiesByState.js');
const { QueryTypes } = require('sequelize');
const db = require('../config/database.js')
const pHUniversalIndicator = require('../util/phScale.js')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router
  .route("/")
  // get all the users (accessed at GET http://localhost:3001/user)
  .get(function (req, res) {
    getBrazilLevel()
      .then((response) => {
        res.status(200).json(response)
      })
      .catch((err) => res.send(err));
  });

router
  .route("/:stateId")
  // get the user (accessed at GET http://localhost:3001/user/1)
  .get(function (req, res) {
    const id = req.params.stateId;
    
    State.findByPk(id)
      .then((response) => {
        // let aux = GetCitysByState(response.sigla)
        // console.log(aux)
        res.status(200).json(response)
      })
      .catch((err) => res.send(err));
  });

router
  .route("/:stateId/citys")
  // get the user (accessed at GET http://localhost:3001/user/1)
  .get(function (req, res) {
    const id = req.params.stateId;
    getCitiesData(id)
      .then((response) => {
        // let aux = getCitiesByState(selectState)
        res.status(200).json(response)
      })
      .catch((err) => res.send(err));
  });


async function getBrazilLevel() {
  try {
    const statesData = await db.sequelize.query("SELECT * " +
    " FROM (SELECT stateID, AVG(ph) AS ph, AVG(turbidity) AS turbidity FROM ( " +
      " SELECT eq.stateID,eq_data.ph,eq_data.turbidity " +
      " FROM equipment AS eq " +
      " INNER JOIN ( " +
        " SELECT deviceEUI, ph, turbidity, max(DATE) AS date " +
        " from equipment_data " +
        " group by deviceEUI )AS eq_data " +
      " ON eq.deviceEUI = eq_data.deviceEUI) AS allData " +
      " GROUP BY stateID) AS allDataFinal " +
    " INNER JOIN state AS st " +
    " ON st.id = allDataFinal.stateID ", { type: QueryTypes.SELECT });


    let result = JSON.parse(JSON.stringify(DataEstados))
    result.features.map((item,index) => {
      let database = statesData.filter(fitem => fitem.id === item.properties.id)[0]
      // console.log("database",database, item.properties.id)
      item.properties = {
        ...item.properties,
        center_lat: database.center_lat,
        center_lng: database.center_lng,
        water: {
          value: database.turbidity ,
          color: pHUniversalIndicator((database.turbidity * 100) / 14 / 100).hex()
        },
        ph: {
          value: database.ph,
          color: pHUniversalIndicator((database.ph * 100) / 14 / 100).hex()
        }
        
      }
    })
    return result
  } catch (error) {
    console.log("error",error);
    return error
  }
}

async function getCitiesData(stateId) {
  try {
    const citysOfStateData = await db.sequelize.query("SELECT allDataFinal.stateID, allDataFinal.cityID, allDataFinal.ph, allDataFinal.turbidity, st.name, st.sigla, st.center_lat, st.center_lng " +
    " FROM (SELECT stateID, cityID, AVG(ph) AS ph, AVG(turbidity) AS turbidity FROM ( " +
        " SELECT eq.stateID, eq.cityID,eq_data.ph,eq_data.turbidity " +
        " FROM equipment AS eq " +
      " INNER JOIN ( " +
        " SELECT deviceEUI, ph, turbidity, max(DATE) AS date " +
        " from equipment_data " +
        " group by deviceEUI )AS eq_data " +
      " ON eq.deviceEUI = eq_data.deviceEUI) AS allData " +
       "WHERE allData.stateID = " + stateId + " " +
      " GROUP BY cityID) AS allDataFinal " +
    " INNER JOIN state AS st " +
    " ON st.id = allDataFinal.stateID ", { type: QueryTypes.SELECT });

    let mapData = GetCitiesByState(citysOfStateData[0].sigla)
    mapData.features.map((item,index) => {

      let database = citysOfStateData.filter(fitem => fitem.cityID === parseInt(item.properties.id))[0]

      item.properties = {
        ...item.properties,
        center_lat: database.center_lat,
        center_lng: database.center_lng,
        water: {
          value: database.turbidity ,
          color: pHUniversalIndicator((database.turbidity * 100) / 14 / 100).hex()
        },
        ph: {
          value: database.ph,
          color: pHUniversalIndicator((database.ph * 100) / 14 / 100).hex()
        }
        
      }
    })

    return mapData
  } catch (error) {
    console.log("error",error);
    return error
  }
}
module.exports = router;
