const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require('cors')
app.use(cors())

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var mongoDB = 'mongodb://127.0.0.1:27017/pingpong';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

const playersRoutes = require('./api/routes/players');
const matchesRoutes = require('./api/routes/matches');

app.use('/players', playersRoutes);
app.use('/matches', matchesRoutes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;