import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscribable, Subscription } from 'rxjs';
import { useAnimation } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../auth/auth-data.model';
import axios from 'axios';
// const jwt = require('jsonwebtoken');
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  private authListenerSubs : Subscription;
  email= "";
  firstName="";
  changeText4 :boolean;
  isAdmin = false;
  changeText7 :boolean;
  valueForSearch  = "";
  userName="";
  currentTime : Date;
 // finalTime : Date;
 getAccessories : boolean;
  changeText2 : boolean;
  changeText: boolean;
  changeText3:boolean;
  AuthData : AuthData;
  imagePath = "";
  _idUser = "";
   interval = 0;
   _id="";
   img ="";
   icon = "";
   city = "";
   country = "";
  
   temp = "";
   cuttentTime = "";
   currentTemp ;
   finalTime : string;
  userIsAuthenticated = false;
  constructor(private authService : AuthService,public http: HttpClient,public activeRoute:ActivatedRoute) {

    // this._id = this.authService.getUserId();
    // //  this.http.get<{user:AuthService}>("http://localhost:4500/user/" + this._id).subscribe(data=>{
    // //    this.userName = data.user.;
    // //  })
    // this.authService.getUserById(this._id).subscribe(data=>{
    //   this.userName = data.user.userName;
    // })
   }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    
  }
  onLogOut(){
    this.authService.LogOut();
  }
  logout(){
    //this.authService.logout();
  }
  login(){
   // this.authService.login();
  }

  checkLoggingIn(){
    return this.authService.loggedIn();
  }
  func(img){
  //  alert(img);
   // console.log(img);
  }
  ngOnInit(): void {
    
    this.changeText4 = false;
    this.authService.getUserByEmail(localStorage.getItem("email")).subscribe(data=>{
      if(data.user.role==="admin"){
        this.isAdmin = true;
      }
      this.country = data.user.address.state.name;
      this.city = data.user.address.city.name;
      console.log("this city is" + this.city);
      if(this.city === undefined || this.city===""){
        this.city="Jerusalem"
        this.country = "Israel"
      }
     
      this.cuttentTime = "";
     // alert(this.city);
      axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&appid=13e12fcb31df35db1cf242d892164175").then(data=>{
       // alert(this.city);
        let temp = parseFloat(data.data.main.temp)-273.5;
        this.currentTemp = temp;
        this.currentTemp = this.currentTemp.toFixed(0);
        console.log("temp" + temp);
       console.log(data.data.coord.lat);
       console.log(data.data.coord.lon);
      this.getCurrentTime(data.data.coord.lon,data.data.coord.lat);
       
      //  this.main = data.data.weather[0].main;
      //  this.desc = data.data.weather[0].description;
       this.icon = data.data.weather[0].icon;
      //  let icon=this.icon;
      
       this.img = "http://openweathermap.org/img/wn/" + this.icon + "@2x.png"

      })
      

    })

    console.log('queryParams');
    this.activeRoute.params.subscribe(
     params => 
    this._idUser = params['_id']
     );

     if(this._idUser!==undefined){
      // alert("asdasda");
      
        
        this.http.get<{token:string,expiresIn:Date,user:AuthData}>("http://localhost:4500/user/info/google/" + this._idUser).subscribe(data=>{
          
         //console.log("asdasd"+data.expiresIn);
       //  this.authService.saveAuthData(data.token,data.expiresIn,data.user.email);
       this.authService.setToken(data.token);
       if(this.authService.loggedIn()){
        console.log(this.userName);
        this.userName = data.user.userName;
      //  alert(this.userName);
        this.email = data.user.email;
        this.firstName = data.user.firstName;
      //  this.lastName = data.user.lastName;
        this.imagePath = data.user.imagePath;
       // const date = Date.now();
        
        console.log("this is the email " + data.user.email);
             this.authService.saveDataInLocalStorage(data.user.email,data.user.firstName,data.user.lastName,data.user.phoneNumber,data.user.userName);
         console.log("this is the email " + data.user.email);


       }
          
          
        });
      
    

     }else{

     


      const _id = localStorage.getItem('_id');
      this.http.get<{user:AuthData}>('http://localhost:4500/user/' +_id).subscribe(data=>{
      // console.log(data.user.firstName);  
      // this.user.firstName = data.user.firstName;
       this.firstName = data.user.firstName,
       ///this.lastName = data.user.lastName,
      // this.phoneNumber = data.user.phoneNumber,
       this.email = data.user.email,
       this.userName = data.user.userName
      // alert(this.userName);
      
    });

  // });
     }





    
     this._id = this.authService.getUserId();
    //  this.http.get<{user:AuthService}>("http://localhost:4500/user/" + this._id).subscribe(data=>{
    //    this.userName = data.user.;
    //  })
    this.authService.getUserById(this._id).subscribe(data=>{
      this.userName = data.user.userName;
      console.log(data.user);
      this.imagePath = data.user.imagePath;
      
    //  alert(this.imagePath);
    //  alert(this.userName);
    })

    this.getUserByEmail();
 
  }

  getUserByEmail(){
    
    if(this.authService.loggedIn()){
     let email = this.authService.getEmailFromLocalStorage();
      this.email = email;
      let firstName = this.authService.getFirstNameFromLocalStorage();
      this.firstName = firstName;
      let userName =this.authService.getUserNameFromLocalStorage();
      this.userName = userName;
    }
    //this.authService.getUserByEmail
  }


  getCurrentTime(lon:string,lat:string){
    // if(lon === undefined){
    //   lon = (31.7683).toString();
    //   lat = (35.21).toString();

    // }
    axios.get("https://api.ipgeolocation.io/timezone?apiKey=d27c2b334159456e9512be41ed06f3c4&lat="+lat+"&long="+lon).then(time=>{
      // let currentTime = time.data.time_24;
       let date = time.data.date;
       let location = time.data.timezone;
       console.log(location);
      // console.log(currentTime);
       console.log(date);
       
  
       this.currentTime = time.data.date_time;
       let timeNow = new Date(this.currentTime);

         this.interval = setInterval(() => {         //replaced function() by ()=>
          let time = timeNow;
          
          this.getTime(time.getHours(),time.getMinutes(),time.getSeconds,time);
         
         
    



          }, 1000);
        
          
          

     })
  }

   addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
   getTime(h:any,m:any,s:any,d:Date) {
    var d = new Date();
    var h = this.addZero(d.getHours());
    var m = this.addZero(d.getMinutes());
    var s = this.addZero(d.getSeconds());
    this.finalTime = h + ":" + m + ":" + s;
  }


  values = '';

  onKey(event: any) { 
    // without type info

    if(event.keyCode === 13){
      this.values += event.target.value;
     // alert(this.values);
      if(this.values!==""){
        location.href = "/search/" + this.values;

      }else{
        location.href = "/search/item";

      }
    }
    
    //alert(this.values);
  }

  GoTo(valueForSearch:string){
    this.valueForSearch = valueForSearch;
    alert(valueForSearch);
    location.href = "/search/"+valueForSearch;
  }
 
}


