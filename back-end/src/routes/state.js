var express = require("express");
var router = express.Router();
var State = require("../models/state");
var City = require("../models/city");
var DataEstados = require("../data/estados/estados.json");
var GetCitiesByState = require('../util/GetCitiesByState.js');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router
  .route("/")
  // get all the users (accessed at GET http://localhost:3001/user)
  .get(function (req, res) {
    State.findAll()
      .then((response) => {
        let result = JSON.parse(JSON.stringify(DataEstados))
        result.features.map((item,index) => {
          let database = response.filter(fitem => fitem.id === item.properties.id)[0]
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
        res.status(200).json(result)
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
