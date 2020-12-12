const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cpu = new Schema({


  name :String,
  company:String,
  price:String,
  imgPath:String,
  imgPathCompanyLogo:String,
  numOfStars :String,
  key:String,
  isChecked:String,
  description:String

});


module.exports = mongoose.model('Processors', Cpu);
