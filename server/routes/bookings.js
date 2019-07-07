var express = require("express");

var router = express.Router();
var db  =require('../db/db');

router.get("/bookings",function(req,res,next){
    // res.send("bookings route");
    db.bookings.find((err,docs)=>{
        console.log("booked01");

        if(err){
            res.send(err);  
        }
        res.json(docs);
    });
});

router.post('/bookings',function(req,res,nex){
    console.log(req.body);
    var booking = req.body.data;
    var nearByDriver = req.body.nearByDriver;
    var io = req.app.io;

    if(!booking.userName){
        console.log("booked0");
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }else{
        db.bookings.save(booking,function(err,docs){
            if(err){
                res.send(err);
            }
            console.log(docs);
            res.send(docs);

            if(nearByDriver.socketId){
                io.emit(nearByDriver.socketId+"driverRequest",docs);
                
            }else{
                console.log("Driver is ofline"); 
            }
        });
    }
});
// Driver  Update Booking done on driver side
router.put("/bookings/:id", function(req, res, next){
    var io = req.app.io;
    var booking = req.body;
    if (!booking.status){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.bookings.update({_id: db.ObjectId(req.params.id)},{ $set: { 
        	driverId: booking.driverId,
        	status: booking.status 
        }}, function(err, updatedBooking){
        if (err){
            res.send(err);
        }
        if (updatedBooking){
            //Get Confirmed booking
            db.bookings.findOne({_id:  db.ObjectId(req.params.id)},function(error, confirmedBooking){
                if (error){
                    res.send(error);
                }
                res.send(confirmedBooking);
                io.emit("action", {
                    type:"BOOKING_CONF",
                    payload:confirmedBooking
                });
            });
        }
    });
    }
});

module.exports=router;
