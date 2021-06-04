var express = require('express');
var router = express.Router();
var User = require('../models/user');
const bcrypt = require('bcryptjs');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('auth time: ', Date.now());
    next();
});



// auth a user (accessed at POST http://localhost:3001/auth)
router.route('/').post(async function(req, res, next) {
        console.log("req",req.body)
        const { username, password } = req.body
        const user = await User.findOne({
            where: {
                username: username
            },
        })

        if (user == null) {//nao existe usuario
            let err = new Error('O recurso que o cliente está solicitando não existe.');
            err.status = 404;
            next(err);
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                res.status(200).json(user)
            } else {
                let err = new Error('Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta solicitada.');
                err.status = 401;
                next(err);
            }
        }
    })

module.exports = router;