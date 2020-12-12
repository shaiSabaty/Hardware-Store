const mongoose = require('mongoose');
const CitySchema = mongoose.Schema({

    name:String,
    country:String,
    subcountry:String,
    geonameid:String

});

module.exports=mongoose.model('cities', CitySchema);