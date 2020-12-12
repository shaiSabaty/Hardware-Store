const mongoose = require('mongoose');
const CitySchema = require('./City');
const Country = require('./Country');
const UserCartSchema = require('./UserCart').schema;
const Product = require('./Product');
const Address = require('./Adress').schema;
var uniqueValidator = require('mongoose-unique-validator');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    // email : {type:String, required:true,unique:true},

    email : {type:String,unique:true},
    password : {type:String},

    address:{
        type:Address,
        default:{
            line1:"",
            city:{name:"",area:""},
            state:{name:""}
           
            
        }
    },
    role: String,

    
    phoneNumber : {type:String},
    isActive:{type:Boolean,default:false},
    
    
        facebookId:String,
        googleId:String,
        userName : String,
        firstName : String,
         lastName : String,
         imagePath:String,
   
    Cart : {
        type:UserCartSchema,
        default:{
            products:[],
            amount:[],
            status:"Active"
        }
    },
    orderHistory: [  ] 
    
  
   
 
});

userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User', userSchema);
