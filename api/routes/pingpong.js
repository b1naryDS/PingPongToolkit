const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

var db = mongoose.connection;
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var playerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String, 
  matches: [],
  setsWon: Number
}, {collection: 'players'}
,{
  versionKey: false // You should be aware of the outcome after set to false
}
);

var PlayerData = mongoose.model('PlayerData', playerSchema);


router.get("/", (req, res, next) => {
  PlayerData.find()
      .then(result =>{
        console.log(result);
        res.send(result);
      })
});


router.post("/insert", (req, res, next) => {
  const player = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    matches: req.body.matches,
    setsWon: req.body.setsWon,
  };
  console.log(req.body);
  //console.log("player");
  console.log(player);
  var data = new PlayerData(player);
  data
    .save();
  console.log(data);
  res.send(data);
});


router.delete("/delete/:id", (req, res, next) => {
  console.log(req.params.id);
  //var id = req.params.id;
  PlayerData.findByIdAndRemove(req.params.id).exec();
  PlayerData.find()
      .then(result =>{
        console.log(result);
        res.send(result);
      })
});

router.put("/update/:id",(req,res,next)=>{
  console.log("updejt");
  console.log(req);
  PlayerData.find()
      .then(result =>{
        console.log(result);
        res.send(result);
      })
})



module.exports = router;