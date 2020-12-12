import { Component, ElementRef, NgZone, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { AuthData } from '../../auth/auth-data.model';
// import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { ThrowStmt } from '@angular/compiler';
import { MapsAPILoader } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import axios from 'axios';
import {Title} from '@angular/platform-browser';
import {Location, Appearance, GermanAddress,MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

import PlaceResult = google.maps.places.PlaceResult;
import { HttpClient } from '@angular/common/http';
import { TimeInterval } from 'rxjs';

//  import { } from '@types/googlemaps';
//  import { google } from "google-maps";
// import {} from '@types/googlemaps';
//import {} from "googlemaps";

@Component({
  selector: 'app-user-details-expand',
  templateUrl: './user-details-expand.component.html',
  styleUrls: ['./user-details-expand.component.css']
})
export class UserDetailsExpandComponent implements OnInit {
  user: AuthData;
  // city = "";
  _id : string;
  lastName = "";
  phoneNumber = "";
  vat = 0;
  role = "";
  // currentCountry = "";
  form :FormGroup;
  arrTemp = [];
  arrCity = [];
  price = 0;
  totalPrice =0;
  firstName="";





  /////////////////////////////////////////////////////////


  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  zipCode = "";
  public selectedAddress: PlaceResult;
  myDate :Date;
  title = 'gps';
  interval = 0 ;
  time :Date;
  location = "";
  main ="";
  desc="";
  fullAddress = "";
  img = "";
  icon = "";
  finalTime = "";
  currentTime :Date;
  date = "";
  // latitude = 51.678418;
  // longitude = 7.809007;
  locationChosen=false;
  cityName = "";
  temp = 0 ;
  //role: String;

  choseLocation(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
   
    console.log(event);
 
   }




  ////////////////////////////////////////////////



  // public latitude: number;
	// public longitude: number;
	public fillInAddress: '';
	public searchControl: FormControl;
	// public zoom: number;
	public f_addr: string;
	public city: string; 
	public country: string;
	public scountry: string; 
	public postCode: string; 
  public estab: string; 
  
	public state: string; 
	@ViewChild('search' ) public searchElement: ElementRef;
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  constructor(public authService: AuthService,private router : Router,public route :ActivatedRoute,
                      private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,private titleService: Title,public http:HttpClient) { 
    this.getAllCountries();
    this.cityChecked();
    this.setCurrentPosition();
  }



  // private setCurrentPosition() {
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         this.latitude = position.coords.latitude;
  //         this.longitude = position.coords.longitude;
  //         this.zoom = 12;
  //       });
   
   
   
  //     }
  //   }

  cityChecked(){
    
   
    axios.get<{cities:any[]}>('http://localhost:4500/country/' +this.country).then(data=>{
      console.log( data.data.cities);
      
      data.data.cities.forEach(el=>{

       this.arrCity.push(el.name);
      });
     })
    console.log(this.arrCity);
    this.setCurrentPosition();

  }
  changeClient(event){
    this.country = event;
    // alert(this.country);
    this.setCurrentPosition();

    axios.get<{cities:any[]}>('http://localhost:4500/country/' +this.country).then(data=>{
      console.log( data.data.cities);
        this.arrCity = [];

      data.data.cities.forEach(el=>{
       this.arrCity.push(el.name);
      });
     })
    console.log(this.arrCity);
  }

  getAllCountries(){
    axios.get<{country:any[]}>('http://localhost:4500/country').then(data=>{
     data.data.country.forEach(el=>{
      this.arrTemp.push(el);
     });
    })
   console.log( this.arrTemp);
   }

   getAllCityByCountry(country:string){
    axios.get<{cities:any[]}>('http://localhost:4500/country/' + country ).then(data=>{
     data.data.cities.forEach(el=>{
      this.arrCity.push(el);
     });
   })
   console.log( this.arrCity);
   }
   
   goPayment(){
    // if (this.form.invalid){
    // validateVerticalPosition
    //   return;
    // }
    this.authService.updateUser(this._id,this.form.value.firstName, this.form.value.lastName, this.form.value.phoneNumber,
    this.form.value.country, this.form.value.city, this.form.value.address,this.role);
    this.form.reset();
  }


  ngOnInit(): void {

    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
 
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
    
    this.setCurrentPosition();


    this.form = new FormGroup({
      firstName:new FormControl(null,{validators:[Validators.required]}),
      lastName:new FormControl(null,{validators:[Validators.required]}),
      phoneNumber:new FormControl(null,{validators:[Validators.required]}),
      country:new FormControl(null,{validators:[Validators.required]}),
      city:new FormControl(null,{validators:[Validators.required]}),
      address:new FormControl(null,{validators:[Validators.required]}),
      zipCode:new FormControl(null,{validators:[Validators.required]})
     // country:new FormControl(null,{validators:[Validators.required]})
     });
              // alert("data.user.email");

       let email = localStorage.getItem("email");
        this.authService.getUserByEmail(email).subscribe(data=>{
        this.user = data.user;
       this.firstName = data.user.firstName;
       this.lastName = data.user.lastName;
       this.phoneNumber = data.user.phoneNumber;
       this.role =data.user.role;
        this.totalPrice=0;
        this.price = 0;
       for(let i =0;i<data.user.Cart.products.length;i++){
           this.totalPrice += parseFloat (data.user.Cart.products[i].price);
           this.price +=parseFloat (data.user.Cart.products[i].price);
       }
       this.vat = this.totalPrice*0.16;
       this.totalPrice+=this.vat;
              // this._id=data.user._id;
                this.form.setValue({       
                  firstName:this.user.firstName,
                  lastName:this.user.lastName,
                  phoneNumber:this.user.phoneNumber,
                  price : this.totalPrice
                  // country:this.user.country,
                  // city:this.user.city,
                  // address:this.user.address
             });
           });
          
    
           this.setCurrentPosition();
            
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        console.log(  "latitude:" +this.latitude);
        console.log(  "longitude:" +this.longitude);
      
      });
    }
  }
 
  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    console.log(result);
    this.fullAddress =result.formatted_address;
  }
 
  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    //this.fullAddress = locatio
    axios.get("http://api.openweathermap.org/data/2.5/weather?lat="+this.latitude+"&lon="+this.longitude+"&appid=13e12fcb31df35db1cf242d892164175").then(data=>{
      // this.temp=data.data.main.temp;
      // let temperature = parseInt(this.temp);
      // console.log(temperature-273);
      let temp = parseFloat(data.data.main.temp)-273.5;
      console.log("temp" + temp);
     console.log(data.data);
     this.main = data.data.weather[0].main;
     this.desc = data.data.weather[0].description;
     this.icon = data.data.weather[0].icon;
     let icon=this.icon;
    
     this.img = "http://openweathermap.org/img/wn/" + this.icon + "@2x.png"
   
  
     

     

     console.log(this.main);
     console.log(this.desc);
     console.log(this.icon);
     this.temp = temp;
      //let time = data.data.timezone;
      //date.getTimezoneOffset(time);
       
      axios.get("https://api.ipgeolocation.io/timezone?apiKey=d27c2b334159456e9512be41ed06f3c4&lat="+this.latitude+"&long="+this.longitude).then(time=>{
       // let currentTime = time.data.time_24;
        let date = time.data.date;
        let location = time.data.timezone;
        console.log(location);
       // console.log(currentTime);
        console.log(date);
        console.log(time.data);
        let time24 = time.data.time_24;
        console.log(time24);
        this.location = location;
       // this.currentTime = currentTime;
        this.date = date;
        //let dateTime = new Date(time.data.date_time);
        //console.log(dateTime);
        //let seconds = dateTime.getSeconds();
       // console.log(seconds);
        
        // this.myDate = new Date();


        // // let d = new Date();

        // let utc = this.myDate.getTime() + (this.myDate.getTimezoneOffset() * 60000);
    
        // let nd = new Date(utc + (3600000*data.data.timezone));
    
        // console.log( "The local time in " + "city" + " is " + nd.toLocaleString());
   
        this.currentTime = time.data.date_time;
        
       
          this.interval = setInterval(() => {         //replaced function() by ()=>
            let time = new Date(this.currentTime);
            console.log(time);
           this.finalTime = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
             console.log(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()); 
            //  console.log(time.getMinutes()+":");
            //  console.log(time.getSeconds());
             // just testing if it is working
           }, 1000);
         
           
           

      })
    })
  }
 
 onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
    console.log('onGermanAddressMapped', $event.country.short);
  }

  ngOnDestroy() {
    if (this.interval) {
   //   clearInterval(this.interval);
    }
 }

 saveUserDetails(){
   
  // alert(this.firstName);
  // alert(this.lastName);
  // alert(this.form.value.city);
  // alert(this.form.value.country);
  // alert(this.fullAddress);
  // alert(this.form.value.phoneNumber);
  // this.authService.saveDetails(this.firstName,this.lastName,this.form.value.phoneNumber,
  //   this.form.value.country,this.form.value.city,this.fullAddress,this.form.value.zipCode);

  let firstName =this.form.value.firstName;
  let lastName = this.form.value.lastName;
  let phoneNumber =  this.form.value.phoneNumber;
  let country =    this.form.value.country;
  let city =   this.form.value.city;
  let fullAddress =    this.fullAddress;
  let zipCode =  this.form.value.zipCode;
  let email = localStorage.getItem("email");

  // alert(firstName);
  // alert(lastName);
  // alert(phoneNumber);
  // alert(country);
  // alert(city);
  // alert(fullAddress);
  // alert(zipCode);
  // alert(email);

    // let data = {firstName,lastName,phoneNumber,
    //   country,city,fullAddress,zipCode};
      // this.authService.saveDetails(email);
      

      // this.http.get<{authData:AuthData}>("http:localhost:4500/user/saveUserDetails/"+ email).subscribe(data=>{
      //   console.log(data.authData);
      
      // }

      // )}
      // }
      
     
      this.http.get<{user:AuthData}>("http://localhost:4500/user/saveUserDetails/"+ email+"/"+ firstName+"/"+ lastName+"/"+ phoneNumber+"/"+ country+"/"
      + city+"/"+ fullAddress+"/"+ zipCode).subscribe(data=>{
           console.log(data);
      })
    // this.authService.getUserByEmail(localStorage.getItem("email")).subscribe(data=>{
    //  this.http.get<{firstName:string,lastName:string,phoneNumber:string,
    //   // /saveUserDetails/:email/:firstName:/lastName/:phoneNumber/:country/:city/:fullAddress/:zipCode"
    //    country:string,city:string,fullAddress:string,zipCode:string}>("http:localhost:4500/saveUserDetails/"+ email+"/"+firstName+
    //    "/"+lastName+"/"+phoneNumber+"/"+country+"/"+city+"/"+fullAddress+"/"+"456456"
       
    //    ).subscribe(data=>{
       
    //    console.log(data);


    //  })
      
  //  })
  

 }

}
