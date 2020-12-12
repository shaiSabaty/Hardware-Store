const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({

    name:String,
    imgPath:String

});

module.exports=mongoose.model('categories', CategorySchema);