var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.route('/')
    //(accessed at GET http://localhost:3001/)
    .get(function(req, res) {
        res.status(200).json({message:"API TCC"})
    });





module.exports = router;