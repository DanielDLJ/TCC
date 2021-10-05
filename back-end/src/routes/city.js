var express = require('express');
var router = express.Router();
var City = require('../models/city');
var State = require("../models/state");
var GetCitiesByState = require('../util/GetCitiesByState.js');

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
        const city = await City.findByPk(cityId,{raw: true});
        // const state = await State.findByPk(city.stateID,{raw: true});

        console.log(city)
        const basePoint = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [125.6, 10.1]
            },
            properties: {
                name: "equipment",
                water: {
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
        let newPoint = JSON.parse(JSON.stringify(basePoint))
        newPoint.geometry.coordinates = [city.center_lat, city.center_lng]
        newPoint.properties.water = {
            value: 11,
            color: "#ff0000"
        }
        newPoint.properties.ph = {
            value: 4,
            color: "#00ff33" 
        }
        result.features.push(newPoint)
        return result
        // mapData.features.map((item,index) => {
        // let database = allCities.filter(fitem => fitem.id === parseInt(item.properties.id))[0]
    
        // item.properties = {
        //     ...item.properties,
        //     center_lat: database.center_lat,
        //     center_lng: database.center_lng,
        //     water: {
        //     value: 10,
        //     color: index%2 === 1 ? "#ff0000": "#00ff33" 
        //     },
        //     ph: {
        //     value: 5,
        //     color: index%2 === 0 ? "#ff0000": "#00ff33" 
        //     }
        // }
        // })
        // return mapData
    } catch (error) {
        console.log("error",error);
        return error
    }
    }
module.exports = router;