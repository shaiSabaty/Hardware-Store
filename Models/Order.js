const mongoose = require('mongoose');
const Product = require('./Product').schema;
const Address = require('./Adress').schema;
const OrderSchema = new mongoose.Schema({
    
    products :[Product],
    amount:[],
    status :String,
    address: Address,
    userId:String,
    date:Date
    
});

module.exports=mongoose.model('Order', OrderSchema);