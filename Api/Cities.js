const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
// const Category= require('../Models/Product');

const City = require('../Models/City');

router.get("/:name",(req,res)=>{
    City.findOne().then(data=>{
     // console.log({data:data.filter(name==="gpu")});
      res.json({
        cityName:req.params.name,
        country:data.country
      
      });
    });
  });


  router.get("/",(req,res)=>{
    City.find().then(data=>{
     // console.log({data:data.filter(name==="gpu")});
      res.json({
        city:data
      
      });
    });
  });
module.exports = router;

