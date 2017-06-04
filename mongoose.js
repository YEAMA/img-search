const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://yeama:yeama123456789@ds161471.mlab.com:61471/imgsearch')

module.exports.mongoose = mongoose;