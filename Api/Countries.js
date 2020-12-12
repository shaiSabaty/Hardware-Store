const express = require('express');
const mongoose = require('mongoose');
const City = require('../Models/City');

const router = express.Router();
// const Category= require('../Models/Product');

const Country = require('../Models/Country');

router.get("/:country",(req,res)=>{
  City.find().then(data=>{
   // console.log({data:data.filter(name==="gpu")});
    res.json({
      countryName:req.params.country,
      cities:data.filter(data=>data.country===req.params.country)
    });
  });
});

router.get("/",(req,res)=>{
  City.distinct("country").then(data=>{
   // console.log({data:data.filter(name==="gpu")});
    res.json({
      country:data
    });
  });

  
});
module.exports = router;

