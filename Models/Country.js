const mongoose = require('mongoose');
const City = require('./City').schema;
const CountrySchema = mongoose.Schema({

    name:String,
    cities : [City]

});

module.exports=mongoose.model('countries', CountrySchema);
