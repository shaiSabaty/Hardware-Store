const mongoose = require('mongoose');
let Comment = require('./Comment').schema;
const Schema = mongoose.Schema;
const Product = new Schema({

  name :String,
 _id:mongoose.mongo.ObjectId,
  company:String,
  price:String,
  imgPath:String,
  description:String,
  imgPathCompanyLogo:String,
  numOfStars:String,
  key:String,
  category:String,
  manufacturer:String,
  comments :[Comment],
amount: {
  type: Number,
  default: 0
}

});


module.exports=mongoose.model('products', Product);
