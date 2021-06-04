var express = require('express');
var router = express.Router();
var User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const axios = require('axios')
const fs = require('fs');
const path = require('path')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.route('/')
    // create a user (accessed at POST http://localhost:3001/user)
    .post(function(req, res, next) {
        console.log("req",req.body)
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        User.create(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error => {
                console.log(error)
                if (error.original.errno == 1062 || error.original.sqlMessage == '23000') { //Duplicate username
                    let err = new Error('Indica que a solicitação não pôde ser processada por causa do conflito no pedido, como um conflito de edição.');
                    if (error && error.original) {
                        console.log(error.errors[0].message)
                        if (error.errors[0].message == 'username must be unique') {
                            err.message = error.errors[0].message;
                            err.code = 1;
                        } else { // nunca vai cair aqui
                            err.message = error.errors[0].message;
                            err.code = 2;
                        }
                    }
                    err.status = 409;
                    next(err);
                } else { //data base error
                    res.status(500).json({
                        error: err
                    })
                }
            });
    })

    // get all the users (accessed at GET http://localhost:3001/user)
    .get(function(req, res) {
        User.findAll()
            .then(responses => res.status(200).json(responses))
            .catch(err => res.send(err))
    });

// router.route('/teste')
//     .get(async function(req, res) {

//         try {
//             const sigla = "TO"
//             const nome = "Tocantins"
//             const id = 27

//             const municipios = await axios.get(
//                 `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`
//               )
//               await writeLog("INSERT INTO state (id, name, sigla) VALUES ( "+id+", \""+nome+"\", \""+sigla+"\");")
//               const options = municipios.data.map(async function (item) {
//                 const json = {
//                     id: item.id,
//                     label: item.nome,
//                     value: item.nome,
//                 }
//                 console.log(json)
//                 await writeLog("INSERT INTO city (id, name, stateID) VALUES ( "+item.id+", \""+item.nome+"\", "+id+");")
//                 return json
//               })

//         } catch (error) {
//             console.log("error",error)
//         }

//         res.status(200).json({status: "OK"})
// });

router.route('/:userId')
	// get the user (accessed at GET http://localhost:3001/user/1)
	.get(function(req, res) {
        const id = req.params.userId
		User.findByPk(id)
            .then(responses => res.status(200).json(responses))
            .catch(err => res.send(err))
	});


// async function writeLog(logString) {
//     try {
//         fs.accessSync(path.resolve(__dirname, 'log.txt'), fs.constants.F_OK);
//         fs.appendFileSync(path.resolve(__dirname, 'log.txt'), "\n" + logString);
//     } catch (error) {
//         console.log("[Error] file does not exist", error)
//     }
// }

module.exports = router;