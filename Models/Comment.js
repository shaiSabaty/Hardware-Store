const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema({

    productName:String,
    productId:String,
    userId:String,
    userImg:String,
    userName:String,
    commentMessage:String,
    date:Date,
    numOfStars:String,
    like:Number,
    dislike:Number
    

    

});

module.exports=mongoose.model('comments', CommentSchema);