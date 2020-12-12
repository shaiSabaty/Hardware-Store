const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
// const Category= require('../Models/Product');

const Category = require('../Models/Category');

router.get("/",(req,res)=>{
    Category.find().then(data=>{
     // console.log({data:data.filter(name==="gpu")});
      res.json({
        categoryName:data
      });
    });
  });

  router.post("/",(req,res)=>{
    let category = new Category({
      name:req.body.name,
      imgPath:req.body.imgPath
    })
    category.save().then(data=>{
      res.json({category:data})
    });
    // Category.categoryName.push(category);
   
    
   
  });

  router.delete("/:name",(req,res)=>{
    Category.findOneAndDelete({name:req.params.name}).then(data=>{
      // console.log({data:data.filter(name==="gpu")});
       res.json({
        categories:data
       });
     });
    
  
  })
module.exports = router;

