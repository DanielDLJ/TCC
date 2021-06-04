var express = require('express');
var router = express.Router();
var City = require('../models/city');

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
		City.findByPk(id)
            .then(responses => res.status(200).json(responses))
            .catch(err => res.send(err))
	});



module.exports = router;