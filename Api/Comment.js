const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Comment = require('../Models/Comment');

router.get("/",(req,res)=>{
    Comment.find().then(data=>{
     // console.log({data:data.filter(name==="gpu")});
      res.json({
        comment:data
      });
    });
  });

  // router.get("/:productId",(req,res)=>{
  //   Comment.find({productId:req.params.productId}).then(data=>{
  //  // console.log({data:data.filter(name==="gpu")});
  //   res.json({
  //     comment:data
  //   })
  // })
  
router.post("/addComment",(req,res)=>{
    const comment = new Comment({
        userId: req.body.userId,
        userName:req.body.userName,
        userImg:req.body.userImg,
        productId :req.body.productId,
        productName :req.body.productName,
        textComment: req.body.textComment,
        numOfStars:req.body.numOfStars,
        like:req.body.like,
        disLike:req.body.like,
         date:new Date()
    });
    comment.save().then(dComment=>
      
    res.status(200).json({
        Comment :{
            
        ...dComment,
        _id:dComment._id
      }
      
      }))


})

module.exports = router;

