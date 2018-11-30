const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
mongoose.connect('mongodb://localhost/HaasSealdTEST');
}else{
    mongoose.connect('mongodb://localhost/HaasSeald');
}

const app = express();
app.use(cors());

//Middelware
// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
app.use(morgan('dev'));
}

app.use(bodyParser.json());
// Routes
app.use('/users', require('./routes/users'));

app.use('/hashes', require('./routes/hashes'));
 
//Start the server
const port=process.env.PORT||5000;
app.listen(port);
console.log(`server is listening at ${port}`);
module.exports=app;
 
