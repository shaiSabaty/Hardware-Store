const express = require('express');
const mongoose = require('mongoose');
const Order = require('../Models/Order');

const router = express.Router();
// const Category= require('../Models/Product');


// router.get("/:_id",(req,res)=>{
//     Order.find({_id:req.params._id}).then(data=>{
//    // console.log({data:data.filter(name==="gpu")});
//     res.json({
//         order:data
//   })

// });


router.get("/:userId",(req,res)=>{
    Order.find({userId:req.params.userId}).then(data=>{
   // console.log({data:data.filter(name==="gpu")});
    res.json({
        order:data
    })
  })



})

router.post("/addOrder",(req,res)=>{
    const order = new Order({
        userId: req.body.userId,
         products :req.body.products,
         amount:req.body.amount,
          address:req.body.address,
        status:req.body.status,
       date:new Date()
  
  
    });
    order.save().then(dproduct=>
      
    res.status(200).json({
      product :{
       
        ...dproduct,
        _id:dproduct._id
      }
      
      }))


})



router.get("/",(req,res)=>{
    Order.find().then(data=>{
   // console.log({data:data.filter(name==="gpu")});
    res.json({
      orders:data
    });
  });

  
});

module.exports = router;