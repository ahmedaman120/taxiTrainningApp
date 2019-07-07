var express = require("express");
var router = express.Router();
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/taxi",["drivers"]);


//Get Single Driver
router.get("/driver/:id", function(req, res, next){
    console.log( req.params.id);
    db.drivers.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, driver){
        if (err){
            res.send(err);
        }
        res.send(driver);
    });
});

module.exports = router;
