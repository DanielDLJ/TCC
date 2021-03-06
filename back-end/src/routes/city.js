var express = require('express');
var router = express.Router();
var City = require('../models/city');
var State = require("../models/state");
var GetCitiesByState = require('../util/GetCitiesByState.js');
const pHUniversalIndicator = require('../util/phScale.js')
const turbidityScale = require('../util/turbidityScale.js')
const db = require('../config/database.js')
const { QueryTypes } = require('sequelize');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.route('/')
    // get all the users (accessed at GET http://localhost:3001/user)
    .get(function(req, res) {
        City.findAll()
            .then(responses => res.status(200).json(responses))
            .catch(err => res.send(err))
    });



router.route('/:cityId')
	// get the user (accessed at GET http://localhost:3001/user/1)
	.get(function(req, res) {
        const id = req.params.cityId
        getCityData(id)
		// City.findByPk(id)
            .then(responses => res.status(200).json(responses))
            .catch(err => res.send(err))
	});


async function getCityData(cityId) {
    try {
        // const city = await City.findByPk(cityId,{raw: true});
        const cityData = await db.sequelize.query("SELECT allDataFinal2.deviceEUI, allDataFinal2.stateID, allDataFinal2.cityID, allDataFinal2.ph, allDataFinal2.turbidity, allDataFinal2.name, allDataFinal2.sigla, ct.name AS cityName, ct.center_lat, ct.center_lng " +
        " FROM ( " +
            " SELECT allDataFinal.deviceEUI, allDataFinal.stateID, allDataFinal.cityID, allDataFinal.ph, allDataFinal.turbidity, st.name, st.sigla " +
            " FROM (SELECT deviceEUI, stateID, cityID, AVG(ph) AS ph, AVG(turbidity) AS turbidity FROM ( " +
                   " SELECT eq.stateID, eq.deviceEUI, eq.cityID,eq_data.ph,eq_data.turbidity" +
                    " FROM equipment AS eq " +
                " INNER JOIN ( " +
                    " SELECT deviceEUI, ph, turbidity, max(DATE) AS date " +
                    " from equipment_data " +
                    " WHERE DATE = (SELECT max(DATE) FROM equipment_data) " +
                    " group by deviceEUI )AS eq_data " +
                " ON eq.deviceEUI = eq_data.deviceEUI) AS allData " +
                " WHERE allData.cityID = " + cityId + " " +
                " GROUP BY cityID) AS allDataFinal " +
            " INNER JOIN state AS st " +
            " ON st.id = allDataFinal.stateID) as allDataFinal2 " +
        " INNER JOIN city AS ct " +
        " ON ct.id = allDataFinal2.cityID ", { type: QueryTypes.SELECT });

        const basePoint = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [125.6, 10.1]
            },
            properties: {
                deviceEUI: "equipment",
                turbidity: {
                    value: 10,
                    color: "#ff0000"
                },
                ph: {
                    value: 5,
                    color: "#00ff33" 
                }
            }
        }
        let result = {
            type:"PointCollection",
            features: []
        }

        cityData.map((item,index) => {
            console.log("item",item)
            let newPoint = JSON.parse(JSON.stringify(basePoint))

            newPoint.geometry.coordinates = [item.center_lat, item.center_lng]
            newPoint.properties.deviceEUI = item.deviceEUI
            newPoint.properties.turbidity = {
                value: item.turbidity,
                color: turbidityScale(item.turbidity).hex()
            }
            newPoint.properties.ph = {
                value: item.ph,
                color: pHUniversalIndicator((item.ph * 100) / 14 / 100).hex()
            }
            result.features.push(newPoint)
        })
        return result
    } catch (error) {
        console.log("error",error);
        return error
    }
    }
module.exports = router;