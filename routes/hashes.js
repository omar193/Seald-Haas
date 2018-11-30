const express = require('express');
const router = require('express-promise-router')();


const { validateBody, schemas } = require('../helpers/routeHelpers');
const HashesController = require('../controllers/hashes');
const passport = require('passport');
const passportConf=require('../passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

/*
 *return error 400 when data is empty
 *return 200 and the hashed data
*/
router.route('/calculateHash')
  .post( validateBody(schemas.hashSchema),HashesController.calculateHash);
  
//Return  200 OK and default value of hash
router.route('/generateDummyHash')
  .get(HashesController.generateDummyHash);

module.exports = router;