var express = require("express");
const axios = require("axios");
var router = express.Router();
var State = require("../models/state");
var City = require("../models/city");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.route("/get_central_point_of_cities").get(function (req, res) {
  getAllCityCentroideData()
    .then(() => {
      res.status(200).json("ok");
    })
    .catch((error) => {
      console.log("error", error);
      res.status(200).json(error);
    });
});

//pick up all the centroids of each city in brazil, according to IBGE DataBase
async function getAllCityCentroideData() {
  let cont = 0;
  let allData = [];
  try {
    allData = await City.findAll();
    allData = allData.map((el) => el.get({ plain: true }));
    allData = allData.filter((fitem) => fitem.center_lat === null);
  } catch (error) {
    console.log("error to allData ");
  }
  for (let city of allData) {
    const result = await axios.get(
      `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${city.id}/metadados`
    );
    console.log(cont, result.data);
    cont++;
    try {
      await City.update(
        {
          center_lat: result.data[0].centroide.latitude,
          center_lng: result.data[0].centroide.longitude,
        },
        {
          where: {
            id: parseInt(city.id),
          },
        }
      );
    } catch (error) {
      console.log("error to update ", city.id);
    }
  }
}

module.exports = router;
