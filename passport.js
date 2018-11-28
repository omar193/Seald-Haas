const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('./configuration');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
  }, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
    
        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        } 
    
        // Otherwise, return the user
        done(null, user);
      } catch(error) {
        done(error, false);
      }
  }));
// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'username'
  }, async (username, password, done) => {

    try {
      // Find the user given the username
      const user = await User.findOne({ username });
      
      // If not, handle it
      if (!user) {
        return done(null, false);
      }
    
      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);
    
      // If not, handle it
      if (!isMatch) {
        return done(null, false);
      }
    
      // Otherwise, return the user
      done(null, user);
    } catch(error) {
      done(error, false);
    }

    
     
  }));