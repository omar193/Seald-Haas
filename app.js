const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/HaasSeald');

const app = express();

//Middelware
app.use(morgan('dev'));
app.use(bodyParser.json());


// Routes
app.use('/users', require('./routes/users'));

 

//Start the server
const port=process.env.PORT||3000;
app.listen(port);
console.log(`server is listening at ${port}`);

