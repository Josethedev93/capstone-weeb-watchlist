require('dotenv').config({path: '../.env'});
const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const AuthRoute = require('./routes/auth');


mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
});

db.once('open', () => {
    console.log('Databse Connection Established!')
});

const app = express();
const port = process.env.PORT;






app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('src'));
app.use('/api', AuthRoute);
app.listen(port, () => { console.log(`server running on port ${port}`) });