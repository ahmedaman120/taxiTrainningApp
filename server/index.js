const express = require('express');
const path  = require('path');
const bodyParser  = require('body-parser');
const socket_io = require('socket.io');
const io = socket_io();



const index  = require("./routes/index");
const booking = require('./routes/bookings');
const driverLocation = require('./routes/driverLocation');
const drivers = require('./routes/drivers');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set("views",path.join(__dirname,"views"));
app.set("view_engine","ejs");
app.engine("html",require("ejs").renderFile);

const port = 4000;
//routes 

app.use('/',index);
app.use('/api',booking);
app.use('/api',driverLocation);
app.use('/api',drivers);



io.listen(
app.listen(port,function(){
    console.log(`app running in port ${port}`);
}));

app.io= io.on("connection",function(socket){
    console.log(`connect to socket ${socket.id}`);
});





