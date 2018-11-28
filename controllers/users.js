const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
    return JWT.sign({
        iss: 'omarmaalej',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        //getting username and password
        //req.value.body
        console.log('contents of req.value.body', req.value.body);
        console.log('UsersController.signUp() called!');
        const { username, password } = req.value.body;

        //check if there is a user with same username 
        const foundUser = await User.findOne({ username });
        if (foundUser) {
            return res.status(403).send({ error: 'username is already in use' })
        }

        const newUser = new User({ username, password });
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);
        // Respond with token
        res.status(200).json({ token });

    },
    signIn: async (req, res, next) => {
        //Generate a token
        console.log('req.user',req.user);
       const token=signToken(req.user);
       res.status(200).json({ token });
        console.log('Successfull Login');

    },
    secret: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ secret: "resource" });

    },



}