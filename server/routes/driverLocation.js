var express = require("express");

var router = express.Router();
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/taxi",["driverLocation"]);

router.put("/driverLocation/:id",function(req,res,next){
    var io = req.app.io;
    if(!req.body){
        res.status(400);
        res.json(
            {
                "error":"Bad Data"
            }
        );
    }else{
        db.driverLocation.update({_id:mongojs.ObjectId(req.params.id)}
                                ,{$set:{socketId:req.body.socketId}}
                                ,function(err,update){
                                    if(err){
                                        res.send(err);
                                    }
                                    db.driverLocation.findOne({_id: db.ObjectId(req.params.id)},function(err, driver){
                                        if (err){
                                            res.send(err);
                                        }
                                        res.send(driver);
                                    });                                    
                                    // res.send(update);
                                });
    }
});


router.get("/driverLocation",function(req,res,next){
    db.driverLocation.ensureIndex({"coordinate":"2dsphere"});
	db.driverLocation.find({
			"coordinate":{
				"$near":{
					"$geometry":{
						"type":"Point",
						"coordinates": [ parseFloat(req.query.longitude),parseFloat(req.query.latitude) ]
					},
					"$maxDistance":10000
				}
			}
		}, function(err, location){
			if(err){
                console.log(err);
				res.send(err);

			}else{
                console.log(location);
				res.send(location);
			}
	});

});

//Get Single Driver and emit track by user to driver
router.get("/driverLocation/:id", function(req, res, next){
    console.log( req.params.id);
	var io = req.app.io;
    db.driversLocation.findOne({driverId: req.params.id},function(err, location){
        if (err){
            res.send(err);
        }
        res.send(location);
        io.emit("trackDriver", location);
    });
});

//Update Location by driver to user
router.put("/driverLocation/:id", function(req, res, next){
    var io = req.app.io;
    var location = req.body;
    var latitude = parseFloat(location.latitude);
    var longitude = parseFloat(location.longitude);
    if (!location){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.driversLocation.update({_id: mongojs.ObjectId(req.params.id)},{ $set: {
        	socketId:location.socketId,
        	coordinate:{
                "type": "Point",
        		coordinates:[
                    longitude,
        			latitude
    			]
    		}
    	}}, function(err, updateDetails){
        if (err){
            console.log(updateDetails);
            res.send(err);
        }
        if (updateDetails){

            //Get updated location
            db.driversLocation.findOne({_id:  mongojs.ObjectId(req.params.id)},function(error, updatedLocation){
                if (error){
                    res.send(error);
                }
                res.send(updatedLocation);
                io.emit("action", {
                    type:"UPDATE_DRIVER_LOCATION",
                    payload:updatedLocation
                });
            });
        }
    });
    }
});

module.exports=router;
