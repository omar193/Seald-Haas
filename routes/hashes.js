const express = require('express');
const router = require('express-promise-router')();


const { validateBody, schemas } = require('../helpers/routeHelpers');
const HashesController = require('../controllers/hashes');
const passport = require('passport');
const passportConf=require('../passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });


router.route('/calculateHash')
  .post( validateBody(schemas.hashSchema),HashesController.calculateHash);

router.route('/generateDummyHash')
  .get(HashesController.generateDummyHash);

module.exports = router;