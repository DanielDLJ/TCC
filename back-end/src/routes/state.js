var express = require("express");
var router = express.Router();
var State = require("../models/state");
var City = require("../models/city");
var DataEstados = require("../data/estados/estados.json");
var GetCitiesByState = require('../util/GetCitiesByState.js');
var chroma = require("chroma-js");
const { QueryTypes } = require('sequelize');
const db = require('../config/database.js')

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
    // console.log(statesData)
    const pHscale = chroma.scale([
      "red", // ff1717
      "orangered", //fe4e15
      "darkorange", //ff7e07
      "sandybrown", //fdbc58
      "khaki", // ffde59
      "darkkhaki", //c9e165
      "yellowgreen", // 7ed956
      "seagreen", //0bb755
      "darkturquoise", //0abebd
      "lightseagreen", //0291be
      "cornflowerblue", //57aefe
      "royalblue", //5666ff
      "mediumslateblue", //a056ff
      "mediumorchid", //ce57ff
      "violet" //#fb55fd
    ]);

    const pHUniversalIndicator = chroma.scale([
      "#cd1719", // firebrick
      "#d92521", //crimson
      "#ed6a18", //chocolate
      "#f5990d", //orange
      "#dec401", //gold 
      "#bdc403", //goldenrod
      "#92c020", //yellowgreen
      "#40a535", //limegreen
      "#609bb5", //cadetblue
      "#6499d2", //cornflowerblue
      "#3869b1", //steelblue
      "#2e4c9b", //darkslateblue
      "#41348b", //darkslateblue
      "#422985", //darkslateblue
      "#61257d" //darkslateblue
    ]);
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
    const state = await State.findByPk(stateId,{raw: true});
    const allCities = await City.findAll({
      where: {
        stateID: stateId
      },
      raw: true,
    });
    let mapData = GetCitiesByState(state.sigla)
    mapData.features.map((item,index) => {
      let database = allCities.filter(fitem => fitem.id === parseInt(item.properties.id))[0]

      item.properties = {
        ...item.properties,
        center_lat: database.center_lat,
        center_lng: database.center_lng,
        water: {
          value: 10,
          color: index%2 === 1 ? "#ff0000": "#00ff33" 
        },
        ph: {
          value: 5,
          color: index%2 === 0 ? "#ff0000": "#00ff33" 
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
