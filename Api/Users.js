
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const express = require('express');
// var ObjectId = require('mongodb').ObjectID;

// const mongoose = require('mongoose');
// const db = mongoose.db
const mongoose = require('mongoose');
const User = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const exphbs   = require('express-handlebars');
const nodemailer = require('nodemailer');
const jwt_decode = require('jwt-decode');
const { auth } = require('firebase');
const bodyParser = require('body-parser');
const JwtDecode = require('jwt-decode');
const { stringify } = require('querystring');
const passport = require('passport');
const keys = require('./config/keys');
const emailToken = "";
var http = require('follow-redirects').http;
const product = require('../Models/Product');
const Product = require('../Models/Product');
// const { data } = require('jquery');

const url = "aa";
router.use(cookieSession({
maxAge:24*60*60*1000,
keys:[keys.session.cookieKey]
}));
router.use(passport.initialize());
router.use(passport.session());
router.get("/info/:email",(req,res,next)=>{
    User.findOne({email:req.params.email}).then(user=>{
      res.status(200).json({user:user});
    })
   });

   


     router.get("/:_id",checkAuth,(req,res,next)=>{
        User.findOne({_id:req.params._id}).then(user=>{
            res.status(200).json({
           user:user
            });
        });

    });


    router.post("/signup",(req,res,next)=>{
        
        User.findOne({email:req.body.email})
    .then(user=>{
    if(user){
        return res.json({
            message:"email exist."
        });
        
        };
    });

   

       
            bcrypt.hash(req.body.password,10).then(hash=>{
                const user = new User ({
                    email:req.body.email,
                    password:hash,
                    
                    userName:req.body.userName,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    phoneNumber:req.body.phoneNumber,
                    Cart:req.body.Cart,
                    orderHistory:req.body.orderHistory,
                    address:req.body.address,
                    isActive:false,
                    role:req.body.role



                });
                user.save()
                // .then(result=>{
                //     res.status(201).json({
                //         ...result,
                //         message:'User Created',
                //         result:result
                //     });
                // })
                .catch(err=>{
                    res.status(500).json({
                        error:err
                    });
                    
                });
            });
            
         



       
        
        
        
    
    });

    router.post("/login",(req,res,next)=>{
        let fetchUser;
    User.findOne({email:req.body.email})
    .then(user=>{
    if(!user){
        console.log("****************");
        console.log(user);
        return res.json({
            message:"email not exist."
        });
        
    }else{
      if(user.facebookId){
        return res.json({
          message:"email in facebook,you need to log in with facebook."
      });
      }
      if(user.googleId){
        return res.json({
          message:"email in google,you need to log in with google."
      });
      }
    }
    fetchUser = user;
    return  bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result){
            return res.json({
                message:"password not match."
                
            });
        }
        const token = jwt.sign({email:fetchUser.email,userId:fetchUser._id},
        'secret_this_should_be_longer',
        {expiresIn:"1h"}
        
        );
        
        res.status(200).json({
            
            token: token,
            expiresIn : 3600,
            email:fetchUser.email,
            userName:fetchUser.userName,
            firstName:fetchUser.firstName,
            lastName:fetchUser.lastName,
            phoneNumber:fetchUser.phoneNumber,
            _id:fetchUser._id,
            isActive:fetchUser.isActive,
            Cart:fetchUser.Cart,
             address:fetchUser.address,
             orderHistory:fetchUser.orderHistory
            //  role:fetchUser.role

            
            //console.log("token success:" + token)


           

        });
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({
            message:"Auth failed"
        });
    });

    });

    router.get("/",checkAuth,(req,res,next)=>{
        
      //  let userName = req.params.userName;
      //  console.log(userName);
      //  User.findOne({userName:userName}).then(user=>{

       
          User.find().then(data=>{
           
            res.status(200).json({
              users:data
              
              });
          
            
        // });
          
        


       })
       
    
    });

    router.delete("/:_id",(req,res)=>{
        User.findByIdAndRemove({_id:req.params._id}).then(data=>res.json(data)).then(data=>console.log(data));
    });

    router.put("/:_id",checkAuth,(req,res,next)=>{
        const user = new User({
            _id: req.body._id,
            firstName :req.body.firstName,
            lastName:req.body.lastName,
            userName:req.body.userName,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email,
            password:req.body.password
        });
        User.updateOne({_id:req.params._id},user).then(res=>{
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
///check this
    // router.get("/:_id",(req,res,next)=>{
    //     User.findOne({_id:req.params._id}).then(user=>{
    //         res.status(200).json({
    //             firstName:user.firstName
    //             ,lastName:user.lastName,
    //             phoneNumber:user.phoneNumber,
    //             userName:user.userName,
    //             email:user.email
    //         });
    //     });

    // });

    router.get("/logout",(req,res)=>{
      req.logOut();
     console.log("asdasdasdasdassssssssssssssssssssssssssssss");
    })
  

    router.get("/:_id",(req,res,next)=>{
        User.findOne({_id:req.params._id}).then(user=>{
            res.status(200).json({
                firstName:user.firstName
                ,lastName:user.lastName,
                phoneNumber:user.phoneNumber,
                userName:user.userName,
                email:user.email
            });
        });

    });
   


    router.post("/sendmail", (req, res) => {
        console.log("request came");
        let user = req.body;
        sendMail(user, (err, info) => {
          if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: "Failed to send email" });
          } else {
            console.log("Email has been sent");
            res.send({from:info.envelope.from,
            to:info.envelope.to
            });
           // res.json(info});
          }
        });
      });

      const sendMail = (user, callback) => {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "shlomi.daniel@gmail.com",
            pass: "sd061087"
          }
        }); 

        const detailsConfirmation = {
            emailToken : jwt.sign({email:user.email,userId:user._id},
                'secret_this_should_be_longer',
                {expiresIn:"1h"}
                
                ),
            url : "http://localhost:4500/user/confirmation/" 
           };

         
        
        const mailOptions = {
            
         
            from: "shlomi.daniel@gmail.com",
            to: user.email,
            subject: "Welcome To aur store",
            html: `please confirm: <a href="${detailsConfirmation.url+detailsConfirmation.emailToken}">${detailsConfirmation.url+detailsConfirmation.emailToken}</a>`
          };
          
       transporter.sendMail(mailOptions, callback);
      }

      router.get("/confirmation/:emailToken",(req,res,next)=>{
        const userId =  jwt_decode(req.params.emailToken).userId; 
        const email = jwt_decode(req.params.emailToken).email;
        //console.log("asdasd");
        console.log(email); 
       console.log(userId);
        User.findOneAndUpdate({email:email},{$set:{isActive:true}}).then(user=>{
         console.log(user);
         
            // alert(`Confirmation success welcome to website`)
             res.redirect('http://localhost:4200/login');
        
        });
         
      });

     
      router.get("/create-new-password/:emailToken",(req,res,next)=>{
        const userId =  jwt_decode(req.params.emailToken).userId; 
        const email = jwt_decode(req.params.emailToken).email;
        //console.log("asdasd");
        console.log(email); 
       console.log(userId);
        res.redirect('http://localhost:4200/create-new-password/' +userId );

//        router.get("/info/info/info/create-password/:_id/:password",(req,res,next)=>{

        //const pass = req.body.password;
       // console.log(pass);
        //res.json({a:pass});
        //this.http.get('http://localhost:4500/create-new-password/')
        User.findOneAndUpdate({email:email},{$set:{
            //isActive:true
         //  password:"1234"
                    
        // password:req.body.password
                
        
        
        }}).then(user=>{
         console.log(user);
         res.json({user:user})
            // alert(`Confirmation success welcome to website`)
            // res.redirect('http://localhost:4200/login');
        
        });
      // res.json({a:"im here"})
         
      });
      

       const sendMailNewPass = (user, callback) => {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "shlomi.daniel@gmail.com",
            pass: "sd061087"
          }
        }); 

           const detailsNewPassword = {
            emailToken : jwt.sign({email:user.email,userId:user._id},
                'secret_this_should_be_longer',
                {expiresIn:"1h"}
                
                ),
            url : "http://localhost:4500/user/create-new-password/" 
           };
           

        
        const mailOptionsNewPass = {
            
         
            from: "shlomi.daniel@gmail.com",
            to: user.email,
            subject: "Welcome To aur store",
          
          
            html: `please click here to create mew password:  <button onclick="myFunction()"><a  href="${detailsNewPassword.url+detailsNewPassword.emailToken}">${detailsNewPassword.url+detailsNewPassword.emailToken}</a></button> `
              
           
             
        };
       
       transporter.sendMail(mailOptionsNewPass, callback);
      }
     
      
      router.post("/send-mail-create-new-password", (req, res) => {
        console.log("request came");
        let user = req.body;
        console.log(user);
        sendMailNewPass(user, (err, info) => {
          if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: "Failed to send email" });
          } else {
            console.log("Email has been sent");
            res.send({from:info.envelope.from,
            to:info.envelope.to
            });
           // res.json(info});
          }
        });
      });


      router.put("/info/info/info/create-password/:_id/:password",(req,res,next)=>{
      //  const id = localStorage.getItem("_id"); 
             const user = { _id: req.params._id,
                password: req.params.password};

                //bcrypt.hashSync(user.password, 10);

                bcrypt.hash(user.password,10).then(hash=>{
                   User.findOneAndUpdate({_id:user._id},{$set:{
                       password:hash
                   }}).then(user=>{
                       res.json({user:user});
                       // res.redirect('http://localhost:4200/login');
                   })
                    
                });
                   

               
            //     User.findOneAndUpdate({_id:user._id},{$set:{

                   


            //         password:user.password
            //     }}).then(user=>{
            //         console.log(user);
            //     })
              
            
            // console.log(user);
            // res.json({user:user});
         
       });

       
     // POST route from contact form
router.post('/contact-us', (req,res)=>{
  
  const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const message = req.body.message;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    
    console.log(email);
    // console.log(phoneNumber);
    // console.log(message);
    // console.log(firstName);
    // console.log(lastName);
    
      const user = {email:email,phoneNumber:phoneNumber,message:message,firstName:firstName,lastName:lastName};

    
    console.log(user);
    sendMailContactUs(user, (err, info) => {
        if (err) {
          console.log(err);
          res.status(400);
          res.send({ error: "Failed to send email" });
        } else {
          console.log("Email has been sent");
          res.send({from:info.envelope.from,
          to:info.envelope.to,
          phoneNumber:phoneNumber,
          firstName:firstName,
          lastName:lastName,
          message:message,
          email:email
          });
         // res.json(info});
        }
      });
     

});

     const sendMailContactUs = (user, callback) => {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "shlomi.daniel@gmail.com",
            pass: "sd061087"
          }
        }); 

        const detailsConfirmation = {
            // emailToken : jwt.sign({email:user.email,userId:user._id},
            //     'secret_this_should_be_longer',
            //     {expiresIn:"1h"}
                
            //     ),
            url : "http://localhost:4500/user/contact-us/" 
           };

         
        
        const mailOptions = {
            
         
            from: user.email,
            to: "shlomi.daniel@gmail.com",
            subject: `Contact by ${user.email}`,
            html: `Contact by ${user.email} with phoneNumber: ${user.phoneNumber} with message:${user.message}`
          };
          
       transporter.sendMail(mailOptions, callback);
      }


      router.get('/logIn/google',passport.authenticate('google',{
        
        scope:['profile',"email"]
      }));
      // router.get('/logout',(req,res)=>{

      // });
  
     //callback route google redirect
    const checkAuthGoogle = (req,res,next)=>{
      if(!req.user){
        console.log("reqbody1"+req.user);
       res.redirect('http://localhost:4200/login');
      }else{
        console.log("reqbody2"+req.user);
        next();
      }
      //console.log("reqbody3"+req.user);
    
    }

     router.get('/logIn/google/redirect',passport.authenticate('google'),(req,res)=>{

      // User.findOne({facebookId:req.user.facebookId}).then(data=>{
      //   if(data){
      //     alert("error face");
      //   }
      // })

     //res.send("you reached callback uri");
    // res.send(req.user);
    const _id = req.user._id;
    // console.log(req.user);
    // if(req.user.facebookId){
    //   alert("face2");
    // }
   // if(req.user){
      res.redirect('http://localhost:4200/profile/' + _id);
 //   }else{
     // res.redirect('http://localhost:4200/login/');
  //  }
     
     })

     router.get('/logIn/facebook',passport.authenticate('facebook',{
      scope:["email"]
    }));
   
     router.get('/logIn/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
       console.log(req.user);
     
      const _id = req.user.id;
     console.log(req.user._id);
      // if(req.user){
      res.redirect('http://localhost:4200/profile/' + _id);
    //   }else{
      });
   

     router.get("/info/google/:_id",(req,res,next)=>{
      
      User.findOne({_id:req.params._id}).then(user=>{
      
        const token = jwt.sign({
          email:user.email,
          userId:user._id
        },
        'secret_this_should_be_longer'
        
        )

        res.json({
          user:user,
          token:token
        
        
        });
      })
     });

    //  router.get("/info/info/info/info/logout-google",(req,res)=>{
    //  // console.log(req);
    //   //req.logout();
    //   res.redirect('http://www.google.com');
    //   res.send({a:"asdasd"});
    //    console.log("*****$$$***$$");
    //   // console.log(req);
    //  });
    // router.get("/info/info/info/logout",(req,res)=>{
    //  console.log("asdasdasda"+req.user);
    //   req.logout();
    //  res.redirect("http://localhost:4200/home");
    //   console.log(req.user);
    // });

    //req.get()


    router.put("/:productId/:_userId",checkAuth,(req,res,next)=>{
      const product = Product.findById({_id:req.params.productId});
      // const user = new User({
      //       _id: req.body._id,
      //       firstName :req.body.firstName,
      //       lastName:req.body.lastName,
      //       userName:req.body.userName,
      //       phoneNumber:req.body.phoneNumber,
      //       email:req.body.email,
      //       password:req.body.password
      //   });
        User.findOneAndUpdate({_id:req.params._userId}).then(res=>{
            res.status(200).json({msg:"success"});
            products.insert({product});
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





    router.put("/addToCart/:_id/:productId",(req,res)=>{
      //const amount = [];
      let flag = false;
     
             Product.findById({_id:req.params.productId}).then(p=>{
              User.findOne({_id:req.params._id}).then(user=>{
                
                for(let i=0;i<user.Cart.products.length;i++){
                   //flag = false;
                   if(user.Cart.amount[i]!=undefined){
                  if(user.Cart.products[i]._id==req.params.productId || user.Cart.amount[i]._id==req.params.productId){
                   
                    user.Cart.amount[i].number++;
                    flag = true;
                    break;
                   }
                 
                   
                  }else{
                    flag = false;
                   }
                }
                console.log(flag);
                if(flag==false){
                  user.Cart.amount.push({_id:req.params.productId,number:1});
                  flag = true;
                }
                console.log(user.Cart.amount);
                console.log(user.Cart.amount.length);
                user.Cart.products.push(
                
                  {
                    _id: p._id,
                    category:p.category,
                    name:p.name,
                    company:p.company,
                    price:p.price,
                    imgPath:p.imgPath,
                    imgPathCompanyLogo:p.imgPathCompanyLogo,
                    numOfStars:p.numOfStars,
                    description:p.description,
                    key:p.key,
                    manufacturer:p.manufacturer,
                    amount:0
                  }
                  )
              // }
                  
         
               
                user.save();
                res.json({user:user})
               
              })
             });
    
    })

    router.get("/cart/:_id",(req,res)=>{
    User.findById({_id:req.params._id}).then(user=>{
      res.json({
        cart:user.Cart
      })
    
    })

    })

    router.put("/deleteProduct/:email/:productId/:j",(req,res)=>{
    const productId = req.params.productId;
    console.log(req.params.j);
        Product.findById({_id:req.params.productId}).then(p=>{
        User.findOne({email:req.params.email}).then(user=>{
         // user.Cart.products.filter({_id:req.params.productId})
        
        // res.json({product:user.Cart.products.filter(p=>p._id !=req.params.productId)})
        User.findOneAndUpdate({email:req.params.email},{$set:{"Cart.products":user.Cart.products.filter(p=>p._id !=req.params.productId),
        "Cart.amount":user.Cart.amount.filter(t=>t._id!=user.Cart.amount[(req.params.j)]._id)}}).then(data=>{
       console.log(user.Cart.amount[req.params.j]._id);
       console.log("$$$$$$");
      // alert(user.Cart.amount[req.params.j]._id);
          res.json({user:data})
             // alert(`Confirmation success welcome to website`)
             // res.redirect('http://localhost:4200/login');
         
         });
          
       });

        })
       });
       
      
  
//
   router.get("/saveUserDetails/:email/:firstName/:lastName/:phoneNumber/:country/:city/:fullAddress/:zipCode",(req,res)=>{

    let firstName = req.params.firstName; 
    let lastName = req.params.lastName;
    let phoneNumber = req.params.phoneNumber;
    let country = req.params.country;
    let city = req.params.city;
    let fullAddress = req.params.fullAddress +" "+ req.params.zipCode;
    let zipCode = req.params.zipCode;
    
        User.findOneAndUpdate({email:req.params.email},{$set:{"address.line1":fullAddress,
    "address.city.name":city,"address.state.name":country,"phoneNumber":phoneNumber,"zipCode":zipCode,
    "Cart.status":"Pending"
  
  }
      
   }).then(data=>{
    res.json({user:data})
   });
//  res.json({firstName:firstName,
//   lastName:lastName,
//   phoneNumber:phoneNumber,
//   country:country,
//   city:city,fullAddress:fullAddress,zipCode:zipCode

// })
   })
// User.findOneAndUpdate({})
  

   router.get("/saveCartToOrderHistory/info/:email",(req,res)=>{
   

    User.findOne({email:req.params.email}).then(data=>{

      var order = {oderId:data.Cart._id, billingAddress:data.address,cart:data.Cart };
      order.cart.status = "Paid";
      data.orderHistory.push(order);
      data.save();
     res.json({user:data})
      //  let products = [];
      //  let amount=[];
      //  let status = "Active";

      //  User.findOneAndUpdate({email:req.params.email},{$set:{"Cart.products":products,
      //  "Cart.amount":amount,"Cart.status":status}}).then(data2=>{
      //    data.save();
      //    res.json({user:data2})
            
         
      //   });

      //data.remove("Cart");
     // User.update({email:req.params.email}, {$unset: {"Cart":1}}, false, true);
   })
   
  //  User.update( { email : req.params.email },{ $push: { "achieve": 95 } });

    })
      
    
    router.get("/cleanCart/:email",(req,res)=>{
   
      let id = mongoose.Types.ObjectId();
     // {$set:{"Cart.status":"Active","Cart._id":id}
      User.update({email:req.params.email}, {$unset: {"Cart.products":1,"Cart.amount":1}},{multi: true}).then(user=>{
        res.json({user:user})

        User.findOneAndUpdate({email:req.params.email},{$set:
          {"Cart.status":"Active","Cart._id":id}
      
          
       }).then(data=>{
        res.json({user:data})
       });

      });
    })
      

       router.put("/changRole/:email/:role",(req,res)=>{
      //   User.findOneAndUpdate({_id:req.params._id},{$set:{"role":req.params.role}}).then(dataUser=>{
      //     res.json({user:dataUser})
      // }).then(data2=>{
      //   res.json({user:data2})
      // })

      User.findOneAndUpdate({email:req.params.email},{$set:{"role":req.params.role}}).then(user=>{
        console.log(user);
        
           // alert(`Confirmation success welcome to website`)
          
       
       });
       })
       
       router.get("/checkRole/:email",(req,res,next)=>{
      
        

          User.findOne({email:req.params.email}).then(user=>{

            try{

         
              if(user.role==="admin"){
                console.log(user);
                console.log(user.role);
              res.json({message:user.role});
              next();
             }else{
               
            //  res.redirect('http://localhost:4200/login');

             // location.href = "http://localhost:4200/accessDenied";
             }
            }
              catch(error){
                console.log(error);
               
            }
           
            res.json({message:"Auth failed here"});
                 // alert(`Confirmation success welcome to website`)
                
             
             });


          })



       
        
 

     
    
    module.exports = router;