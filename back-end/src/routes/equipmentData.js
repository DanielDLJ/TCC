var express = require('express');
var router = express.Router();
var EquipmentData = require('../models/equipmentData');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Equipment time: ', Date.now());
  next();
});


router.route('/')
    // create a EquipmentData (accessed at POST http://localhost:3001/equipmentData)
    .post(function(req, res, next) {
        // console.log("req.body",req.body)
        if(req.body.type === "uplink"){
            let text = Buffer.from(req.body.params.payload, 'base64').toString('ascii');
            var ph = text.substring(2, 4);
            var turbidez = text.substring(7, 11);
            console.log(text)
            console.log("ph",Number(ph))
            console.log("turbidez",Number(turbidez))

            let insert = {
                deviceEUI: req.body.meta.device,
                ph: Number(ph),
                turbidity: Number(turbidez)
            }
            console.log("insert",insert)
            EquipmentData.create(insert)
                .then(result => {
                    res.status(201).json(result)
                })
                .catch(error => {
                    if (error && error.original && error.original.errno == 1452) { //username no exits
                        let err = new Error('deviceEUI ID not found.');
                        err.code = 1;
                        next(err);
                    }else{
                        console.log(error)
                        next(error);
                    }
                });
        }else{
            res.status(201).json({message: "not uplink", type: req.body.type? req.body.type : "undefined type"})
        }
    })

    // get all the EquipmentData (accessed at GET http://localhost:3001/equipmentData)
    .get(function(req, res) {
        EquipmentData.findAll()
            .then(responses => res.status(200).json(responses))
            .catch(err => res.send(err))
    });

router.route('/:equipmentDataId')
	// get the user (accessed at GET http://localhost:3001/equipmentData/1)
	.get(function(req, res) {
        const id = req.params.equipmentDataId
		EquipmentData.findByPk(id)
            .then(responses => res.status(200).json(responses))
            .catch(err => res.send(err))
	});

module.exports = router;