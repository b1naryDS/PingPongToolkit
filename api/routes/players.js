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

var matchSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  player1id: mongoose.Schema.Types.ObjectId,
  player2id: mongoose.Schema.Types.ObjectId,
  player1points:[],
  player2points:[],

}, {collection: 'matches'}
,{
  versionKey: false // You should be aware of the outcome after set to false
}
);

var PlayerData = mongoose.model('PlayerData', playerSchema);
var MatchListData = mongoose.model('MatchListData', matchSchema);


router.get("/", (req, res, next) => {
var data = [];
  
    function getMatchList(callback){
      MatchListData.find().exec(function(err,result){
            if(err){
                console.log(err);
                callback();
            }else{
                const matchList ={
                    "matches":result
                }
                data.push(matchList);
                callback();
            }
        })
    }
    function getPlayerList(callback){
      PlayerData.find().exec(function(err,result){
            if(err){
                console.log(err);
                callback();
            }else{
              console.log(result);
                const playerList ={
                    "players":result
                }
                console.log(playerList);
                data.push(playerList);
                callback();
            }
        })
    }
    function getUnionList(callback){
        getMatchList(function(){
            getPlayerList(callback);
        });
    }
    getUnionList(function(){
        res.send(data);
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