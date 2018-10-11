const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

var db = mongoose.connection;
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

router.get("/", (req, res, next) => {
});

router.post("/insert", (req, res, next) => {
});

router.delete("/delete/:id", (req, res, next) => {
});

router.put("/update/:id",(req,res,next)=>{
})



module.exports = router;