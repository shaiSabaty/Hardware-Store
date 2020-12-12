const mongoose = require('mongoose');
const Product = require('./Product').schema;
const UserCartSchema = new mongoose.Schema({
    
    products :[Product],
    amount:[],
    status :String
    
});

module.exports=mongoose.model('UserCartSchema', UserCartSchema);