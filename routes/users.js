const express = require('express');
const router = require('express-promise-router')();
const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passport = require('passport');
const passportConf=require('../passport');
const passportJWT = passport.authenticate('jwt', { session: false });


/*
 *create user if username is not found 
 *return 403 if  username is not found 
*/
router.route('/signup')
  .post( validateBody(schemas.authSchema),UsersController.signUp);

/*
 *return error 400 when username an password empty
 *return 200 and my token
*/
router.route('/signin')
  .post( validateBody(schemas.authSchema), UsersController.signIn);

/*
 *return status 401 while not printing "I managed to get here!"
 *return status 200 once printing "I managed to get here!"
*/
router.route('/secret')
  .get(passportJWT,UsersController.secret);

module.exports = router;