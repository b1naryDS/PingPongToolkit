const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

var db = mongoose.connection;
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var playerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
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
      },
      error=>{
        console.log("error");
        res.send(error.name);
      }) 
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  PlayerData.findById(req.params.id)
      .then(
      result =>{
        console.log(result);
        res.send(result);
      },
      error=>{
        console.log("cast error");
        res.send(error.name);
      })      
});


router.post("/insert", (req, res, next) => {

  const player = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  };
  console.log(req.body);
  //console.log("player");
  console.log(player);
  var data = new PlayerData(player);
  data
    .save().then(
      result=>{
        res.send(data);
      },
      error=>{
        console.log("error");
        res.send(error.name);
      })
});


router.delete("/delete/:id", (req, res, next) => {
  console.log(req.params.id);
  //var id = req.params.id;
  PlayerData.findByIdAndRemove(req.params.id).exec();
  PlayerData.find()
      .then(result =>{
        console.log(result);
        res.send(result);
      },
      error=>{
        console.log("error");
        res.send(error.name);
      })
});

router.put("/update/:id",(req,res,next)=>{
  
  console.log("req.body");
  console.log(req.body.name);
  PlayerData.findByIdAndUpdate(req.params.id)
      .then(
      result =>{
        console.log(result);
        res.send(result);
      },
      error=>{
        console.log("error");
        res.send(error.name);
      })
})



module.exports = router;