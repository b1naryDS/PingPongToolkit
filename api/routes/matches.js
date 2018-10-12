const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

var db = mongoose.connection;
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);


var matchSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    player1id: mongoose.Schema.Types.ObjectId,
    player2id: mongoose.Schema.Types.ObjectId,
    player1points:[Number],
    player2points:[Number],

  }, {collection: 'matches'}
  ,{
    versionKey: false // You should be aware of the outcome after set to false
  }
  );

  var playerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
  }, {collection: 'players'}
  ,{
    versionKey: false // You should be aware of the outcome after set to false
  }
  );
  
  var PlayerListData = mongoose.model('PlayerListData', playerSchema);
  var MatchData = mongoose.model('MatchData', matchSchema);

  router.get("/test", (req, res, next) => {
    MatchData.find().exec(function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
  });
router.get("/", (req, res, next) => {
    var data = [];
    
    function getMatchList(callback){
        MatchData.find().exec(function(err,result){
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
        PlayerListData.find().exec(function(err,result){
            if(err){
                console.log(err);
                callback();
            }else{
                const playerList ={
                    "players":result
                }
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
        console.log("tu je data");
        console.log(data)
        res.send(data);
    })
});

router.post("/insert", (req, res, next) => {
    console.log(req.body);
    var player1points = [];
    var player2points = [];
    for(var i = 0;i<5;i++){
        if(req.body.player1points[i]!=0 || req.body.player1points[i]!=null || req.body.player1points[i]!='' || req.body.player1points[i]!=undefined){
            player1points.push(req.body.player1points[i]);
            player2points.push(req.body.player2points[i]);
        }else{
            console.log(player1points);
            console.log(player2points);
            break;
        }
    }
    const match = {
        _id: new mongoose.Types.ObjectId(),
        player1id: req.body.player1id,
        player2id: req.body.player2id,
        player1points: req.body.player1points,
        player2points: req.body.player2points,
    }
    var data = new MatchData(match);
    data.save().then(
        result=>{
            res.send(data);
        },
        error=>{
            res.send(error.name);
        }
    )

});

router.delete("/delete/:id", (req, res, next) => {
    console.log(req.params.id);
    MatchData.findByIdAndRemove(req.params.id).exec().then(
        result=>{
            console.log(result);
            res.send(result);
        },
        error=>{
          console.log("error");
          res.send(error.name);
        }
    );
});

router.put("/update/:id",(req,res,next)=>{
})



module.exports = router;