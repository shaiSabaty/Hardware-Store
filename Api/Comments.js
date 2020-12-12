const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
// const Category= require('../Models/Product');

const Comment = require('../Models/Comment');

router.get("/",(req,res)=>{
    Comment.find().then(data=>{
     // console.log({data:data.filter(name==="gpu")});
      res.json({
        comment:data
      });
    });
  });


  router.post("/addComment",(req,res)=>{
    const comment = new Comment({
        userId: req.body.userId,
        like: req.body.like,
        dislike: req.body.dislike,
        commentMessage: req.body.commentMessage,
        numOfStars: req.body.numOfStars,
        date: new Date(),
        productName :req.body.productName,
        productId:req.body.productId,
        userImg:req.body.userImg,
        userName:req.body.userName,
    });
    comment.save().then(dproduct=>
      
    res.status(200).json({
        comment :{
       
        ...dproduct,
        _id:dproduct._id
      }
      
      }))


})

module.exports = router;

