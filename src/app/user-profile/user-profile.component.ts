import { Component, OnInit } from '@angular/core';
import {  Route, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../auth/auth-data.model';
import { ThrowStmt } from '@angular/compiler';
import {nodemailer,transporter} from 'nodemailer';
import { ActivatedRoute, Params } from '@angular/router';

import { auth } from 'firebase';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  //authService:AuthService;
  
  firstName = "";
  lastName = "";
  phoneNumber = "";
  email = "";
  userName = "";
  imagePath = "";
 
  user : AuthData;
  _idUser= "";
  constructor(public router : Router,public http:HttpClient, public authService:AuthService,public activeRoute:ActivatedRoute) {

    
   }

   
   checkConnections(){
    return this.authService.loggedIn();
  }
 
 
  
  
   onLogOut(){
    this.authService.LogOut();
  }
  

  ngOnInit(): void {
    
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }


    console.log('queryParams');
    this.activeRoute.params.subscribe(
     params => 
    this._idUser = params['_id']
     );

     if(this._idUser!==undefined){
      // alert("asdasda");
      
        
        this.http.get<{token:string,expiresIn:Date,user:AuthData}>("http://localhost:4500/user/info/google/" + this._idUser).subscribe(data=>{
          alert("google2")
         //console.log("asdasd"+data.expiresIn);
       //  this.authService.saveAuthData(data.token,data.expiresIn,data.user.email);
       console.log("datadatadatadatadatadatadatadatadata");
       console.log(data.user);
       this.authService.setToken(data.token);
       if(this.authService.loggedIn()){
        console.log(this.userName);
        this.userName = data.user.userName;
        this.email = data.user.email;
        this.firstName = data.user.firstName;
        this.lastName = data.user.lastName;
        this.imagePath = data.user.imagePath;
       // const date = Date.now();
        
        console.log("this is the email " + data.user.email);
             this.authService.saveDataInLocalStorage(data.user.email,data.user.firstName,data.user.lastName,data.user.phoneNumber,data.user.userName);
         console.log("this is the email " + data.user.email);


       }
          
          
        });
      
    

     }else{

     

      if(this.authService.loggedIn()){
        const _id = localStorage.getItem('_id');
        this.http.get<{user:AuthData}>('http://localhost:4500/user/' +_id).subscribe(data=>{
        // console.log(data.user.firstName);  
        // this.user.firstName = data.user.firstName;
         this.firstName = data.user.firstName,
         this.lastName = data.user.lastName,
         this.phoneNumber = data.user.phoneNumber,
         this.email = data.user.email,
         this.userName = data.user.userName
      })
      }
    
    
     }

    


    let email =this.authService.getEmailByToken();
    console.log("my email is" + email);
    console.log("#################");
    
  
   console.log("#################");
  
  }
  orderHistory(){
    let _id = localStorage.getItem("_id");
    this.router.navigate(["/userOrderHistory/"+ _id]);

  }

}
