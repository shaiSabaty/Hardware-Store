const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const jwt = require('jsonwebtoken');
const keys = require('./keys');
const config = require('./config');
const User = require('../../Models/User');
const FacebookStrategy = require('passport-facebook').Strategy;
// const  passport = require('passport')
//   , FacebookStrategy = require('passport-facebook').Strategy;
//serialize user and save the userId to the cookie
passport.serializeUser((user,done)=>{
  done(null,user.id)
});

//deserialize and get the user from the cookie by id from up
passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
      done(null,user);
  });
});

passport.use(

  
    new GoogleStrategy({
        clientID :keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL : "/user/logIn/google/redirect"
        
 
        //client id
        //client server
///google st' options
  },(accessToken,refreshToken,profile,done)=>{
   
   // console.log(profile);
   console.log(profile);
   
   //console.log("new user created email:" + profile.emails.value); 
     User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
          done(null,currentUser)
        //have the user
        console.log("user exist");

        console.log(currentUser);
        }else{

         
            
          new User({
          
            userName:profile.displayName,
            googleId:profile.id,
          //
          
           firstName:profile.name.givenName,
           lastName:profile.name.familyName,
           email:profile.emails[0].value,
           password:"",
           phoneNumber:"",
           imagePath:profile.photos[0].value,
           role:"user"
           

           //.lastName:profile.name.given

            
            // firstName:name.givenName,
            // lastName:name.familyName
    
        }).save().then((newUser)=>{
       console.log("new user created:" + newUser);
       console.log("new user created email:" + newUser.email);  
       done(null,newUser)
        });
        }
     });
  
    //callblack func
    
  })
);




passport.use(
  new FacebookStrategy({
      clientID :config.facebook_api_key,
      clientSecret:config.facebook_api_secret,
      callbackURL : config.callback_url,
      profileFields: ['id', 'displayName', 'photos', 'birthday', 'events', 'profileUrl', 'emails', 'likes']



      //client id
      //client server
///google st' options
},(accessToken,refreshToken,profile,done)=>{
 // console.log(profile);
 console.log(profile);
 ////console.log("new user created email:" + profile.emails.value); 
   User.findOne({facebookId:profile.id}).then((currentUser)=>{
      if(currentUser){
        done(null,currentUser)
      //have the user
      console.log("user exist");
      console.log(currentUser);
      console.log(currentUser);
      }else{

       
          
        new User({
        
          //userName:profile.displayName,
         // facebookId:profile.id,

                facebookId: profile.id,
                userName: profile.displayName,
                imagePath:profile.photos[0].value,
                role:"user",

               /// birthday:profile.birthday,

                //friends:profile.user.friends[0],
                //profileUrl:profile.profileUrl
         // facebook_id : profile.id,
         // imagePath : profile.photos[0].value,
         // email : profile.emails[0].value
         // display_name : profile.displayName,

        //
        
        //  firstName:profile.name.givenName,
        //  lastName:profile.name.familyName,
         email:profile.emails[0].value
        //  password:"",
        //  phoneNumber:"",
        //  imagePath:profile.photos[0].value,
         

         //.lastName:profile.name.given

          
          // firstName:name.givenName,
          // lastName:name.familyName
  
      }).save().then((newUser)=>{
     console.log("new user created:" + newUser);
     console.log("new user created email:" + newUser.email);  
     done(null,newUser)
      });
      }
   });

  //callblack func
  
})
);






// passport.use(new FacebookStrategy({
  
//   clientID: config.facebook_api_key,
//   clientSecret:config.facebook_api_secret ,
//   callbackURL: config.callback_url
// },
// function(accessToken, refreshToken, profile, done) {
 
//     //Check whether the User exists or not using profile.id
//     User.findOne({facebookId:profile.id}).then((currentUser)=>{
//      if(currentUser){
//        done(null,currentUser)
//      }else{
//       new User({
          
//         userName:profile.displayName,
//         facebookId:profile.id,
//       //
      
//       //  firstName:profile.name.givenName,
//       //  lastName:profile.name.familyName,
//       //  email:profile.emails[0].value,
//       //  password:"",
//       //  phoneNumber:"",
//       //  imagePath:profile.photos[0].value,
       

//        //.lastName:profile.name.given

        
//         // firstName:name.givenName,
//         // lastName:name.familyName

//     }).save().then((newUser)=>{
//       done(null,newUser)
//     })
//      }



     
//     if(config.use_database) {
//        //Further code of Database.
//     }
//     return done(null, profile);
//   });
// }
// ));


