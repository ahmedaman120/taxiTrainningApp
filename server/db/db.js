
const mongojs = require('mongojs');
var db = mongojs("mongodb://localhost:27017/taxi",["bookings"]);


module.exports = db;