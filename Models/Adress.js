const mongoose = require('mongoose');
const City = require('./City');
const Country = require('./City');
const AddressSchema = mongoose.Schema({

    line1:String,
    line2:String,
    city:City.schema,
    state:Country.schema,
    zip:String

});

module.exports=mongoose.model('Address', AddressSchema);


