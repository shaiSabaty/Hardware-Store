const express = require('express');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const ObjectID = mongo.ObjectID;
const router = express.Router();
const Product = require('../Models/Product');
const multer = require('multer');
const User = require('../Models/User');
const Comment = require('../Models/Comment');

const checkAuth = require('../middleware/check-auth');
const MINE_TYPE_MAP ={
 'image/png':'png',
 'image/jpeg':'jpg',
 'image/jpg':'jpg'
};

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if(isValid){
      error= null;
    }

     cb(error,"Api/images");
  },
  filename:(req,file,cb)=>{
     const name = file.originalname.toLowerCase().split(' ').join('-');
     const ext =MINE_TYPE_MAP[file.mimetype];
     cb(null,name + '-' + Date.now() + '.' + ext);
  }
});

router.get("/getProductByGroup",(req,res)=>{
  Product.find().then(data=>{
    console.log({data:data});
    res.status(200).json({
      gpus:data.filter(data=>data.category==="gpu"),
      cpus:data.filter(data=>data.category==="cpu"),
      powerSupplys:data.filter(data=>data.category==="powerSupply"),
      cases:data.filter(data=>data.category==="cases"),
      memoryRams:data.filter(data=>data.category==="memoryRam"),
      motherBoard:data.filter(data=>data.category==="motherBoard"),
      powerSupply:data.filter(data=>data.category==="powerSupply"),
      laptops:data.filter(data=>data.category==="laptops"),
      consoles:data.filter(data=>data.category==="consoles"),
      coolingSystem:data.filter(data=>data.category==="coolingSystem"),
      accessories:data.filter(data=>data.category==="accessories")
      
    });
  });
});

router.get("/",(req,res)=>{
  Product.find().then(data=>{
    console.log({data:data});
    res.status(200).json({
      products:data



      
      
    });
  });
});


router.get("/:param",(req,res)=>{
  Product.find().then(data=>{
    console.log({data:data});
    res.status(200).json({
      cpus:data.filter(data=>{
        // return data==="gpu"
        return data.category ===req.params.param
      })
      
      
      
    });
  });
});



router.get("/info/:_id",(req,res)=>{
  //console.log(req.params._id);
  //res.send({a:"aa"})
  Product.findById({_id:req.params._id}).then(product=>res.json({product:product})).then(data=>console.log(data));
  //res.send("asdasd");
});


// router.get("/info/info/category",(req,res)=>{
//   //console.log(req.params._id);
//   ("customers").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();

//   Product.findById({cat:req.params._id}).then(data=>res.json(data)).then(data=>console.log(data));
//   //res.send("asdasd");
// });

// router.get("/nvidia",(req,res)=>{
//   GPU.find().then(data=>{
//     res.status(200).json({
//       gpus:data
      
      
      
//     });
//   });
// });
//get gpu by id

//update gpu by id
router.put("/:_id",checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
  let imgPath=req.body.imgPath;
  if(req.file){
    const url = req.protocol + "://" + req.get("host");
    imgPath = url + "/images/" + req.file.filename
    
  }
    const product = new Product({
      _id: req.body_id,
      name :req.body.name,
      company:req.body.company,
      price:req.body.price,
      description:req.body.description,
      imgPathCompanyLogo:req.body.imgPathCompanyLogo,
      numOfStars:req.body.numOfStars,
      key:req.body.key,
      imgPath:imgPath,
      category:req.body.category,
      manufacturer:req.body.manufacturer
      
    });

    Product.updateOne({_id:req.params._id},product).then(res=>{
       res.status(200).json({msg:"success"});
    });
    res.json({a:"a"});
 // console.log(req.file);
//   GPU.findByIdAndUpdate({_id:req.params._id},req.body).then(function(){
//     GPU.findOne({_id:req.params._id}).then(function(gpu){
//       res.json(gpu);
//       //console.log(gpu);
//     })
//   });

});

//delete gpu by id
router.delete("/:_id",checkAuth,(req,res)=>{

  Product.findByIdAndRemove({_id:req.params._id}).then(data=>res.json(data)).then(data=>console.log(data));
 

});
router.post("/",checkAuth,multer({storage:storage}).single("image"),(req,res)=>{
  const url = req.protocol + "://" + req.get("host");
  const product = new Product({
    _id: new mongoose.mongo.ObjectId, 
    name :req.body.name,
    company:req.body.company,
    price:req.body.price,
    imgPath: url + "/images/" + req.file.filename,
    description:req.body.description,
    imgPathCompanyLogo:req.body.imgPathCompanyLogo,
    numOfStars:req.body.numOfStars,
    key:req.body.key,
    manufacturer:req.body.manufacturer,
    
    category:req.body.category,
    amount:0


  });
  product.save().then(dproduct=>
    
  res.status(200).json({
    product :{
      // _id: res._id,
      // name :res.name,
      // company:res.company,
      // price:res.price,
      // imgPath:res.imgPath,
      // description:req.body.description,
      // imgPathCompanyLogo:res.imgPathCompanyLogo,
      // numOfStars:res.numOfStars,
      // key:res.key
      ...dproduct,
      _id:dproduct._id
    }
    
    }))
});


router.get("/distinct/productName",(req,res)=>{
  Product.distinct("name").then(data=>{
    // console.log({data:data.filter(name==="gpu")});
     res.json({
      productNames:data
     });
   });
  

})

router.get("/distinct/productManufacturer",(req,res)=>{
  Product.distinct("manufacturer").then(data=>{
    // console.log({data:data.filter(name==="gpu")});
     res.json({
      manufacturers:data
     });
   });
  

})

router.get("/distinct/productCompany",(req,res)=>{
  Product.distinct("company").then(data=>{
    // console.log({data:data.filter(name==="gpu")});
     res.json({
       product:data
     });
   });
  

})

router.get("/distinct/productCategories",(req,res)=>{
  Product.distinct("category").then(data=>{
    // console.log({data:data.filter(name==="gpu")});
     res.json({
      categories:data
     });
   });
  

})

router.post("/addCommentToProductComments/:userId/:productId/:commentMessage",(req,res)=>{

  Product.findOne({_id:req.params.productId}).then(product=>{
    User.findOne({_id:req.params.userId}).then(user=>{
      let comment = new Comment({
        userId: req.params.userId,
        like: 0,
        dislike: 0,
        commentMessage: req.params.commentMessage,
        numOfStars: req.body.numOfStars,
        date: new Date(),
        productName :product.name,
        productId:product._id,
        userImg:user.imagePath,
        userName:user.userName,
      })
      product.comments.push(comment);
      product.save();
      res.json({product:product})
    })
  })
    
   
 
  

})

router.get("/getCommentsByProductId/:productId",(req,res)=>
{
     Product.findOne({_id:req.params.productId}).then(product=>{
       res.json({comments:product.comments})
     })


})




module.exports = router;
