var express = require("express");
const axios = require("axios");
var router = express.Router();
var User = require('../models/user');
var State = require("../models/state");
var City = require("../models/city");
const Equipment = require('../models/equipment');
const EquipmentData = require('../models/equipmentData');
const TypesOfRandomDatas = require('../util/TypesOfRandomDatas');
const _ = require("lodash"); 
const geradorNome = require("gerador-nome"); 

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

router.route("/createUsers").get(function (req, res) {
  getAllUser()
    .then(() => {
      res.status(200).json("ok");
    })
    .catch((error) => {
      console.log("error", error);
      res.status(200).json(error);
    });
});

router.route("/createEquipament").get(function (req, res) {
  createEquipament()
    .then(() => {
      res.status(200).json("ok");
    })
    .catch((error) => {
      console.log("error", error);
      res.status(200).json(error);
    });
});


router.route("/createEquipamentData").get(function (req, res) {
  createEquipamentData()
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

async function getAllUser() {
  for (let i = 0; i < 5570 ; i++){
    try {
      const name = getName()
      const username = name.split(' ')[0] + geraStringAleatoria(20)
      const password = '$2a$10$5GVK3XDewiK9Xijao5gzlOp5HNbd0.RPg95WFos7xRtI80ynVYVju'
      await User.create({name,username, password })
      console.log(i, name)
    } catch (error) {
      console.log("getAllUser error", error);
    }
  }
}

function geraStringAleatoria(tamanho) {
  var stringAleatoria = '';
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}

function getName() {
  const Qtq = _.random(1, 5)
  let name = ""
  console.log("Qtq",Qtq)
  for (let i = 0; i < Qtq ; i++){
    const ramd = _.random(1,3)
    let part = ""
    if(ramd === 1) part = geradorNome.geradorNome()
    if(ramd === 2) part = geradorNome.geradorNomeFeminino()
    if(ramd === 3) part = geradorNome.geradorNomeMasculino()

    if(name.length === 0) name = part
    else name += " " + part
  }
  return name
}

async function createEquipament() {
  try {
    const allData = await City.findAll({raw:true});
    console.log(allData.length)
    await allData.forEach(async (element, index) => {
      const auxCreate = {
        deviceEUI: geraStringAleatoria(16),
        userID: index,
        lat: element.center_lat,
        lng: element.center_lng,
        cityID: element.id,
        stateID: element.stateID,
      }
      try {
        await Equipment.create(auxCreate)
      } catch (error) {
        console.log("2 error",error)
      }
    });
  } catch (error) {
    console.log("1 error",error)
  }
}

async function createEquipamentData() {
  try {
    const allData = await Equipment.findAll({raw:true});
    console.log(allData.length)
    // console.log(TypesOfRandomDatas(100))
    let cont = 0
    for(let equipment of allData){
      const newData = TypesOfRandomDatas(100)
      for(let dataToinsert of newData){
        let auxInsert = dataToinsert
        auxInsert.deviceEUI = equipment.deviceEUI
        // console.log(auxInsert)
        try {
          await EquipmentData.create(auxInsert)
        } catch (error) {
          console.log("2 error",error)
        }
      }
    }
    // await allData.forEach( (equipment, index1) => {
    //   const data = TypesOfRandomDatas(100)
    //   data.forEach((itemToinsert, index2) => {
    //     cont++
    //     let insert = itemToinsert
    //     insert.deviceEUI = equipment.deviceEUI
    //     console.log(cont)
    //     // try {
    //     //   await EquipmentData.create(insert)
    //     // } catch (error) {
    //     //   console.log("2 error",error)
    //     // }
    //   })
    // });
  } catch (error) {
    console.log("1 error",error)
  }
}

module.exports = router;
