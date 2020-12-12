import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
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
import { jsdom } from 'jsdom';

import { tap } from 'rxjs/operators';

import axios from 'axios';
import {Title} from '@angular/platform-browser';
import {Location, Appearance, GermanAddress,MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

import PlaceResult = google.maps.places.PlaceResult;
import { HttpClient } from '@angular/common/http';
import { TimeInterval } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';


interface Window {
  paypal: any;
}

declare var window: Window;



@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit,AfterViewInit {
  // @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  user: AuthData;
  // city = "";
  _id : string;
  lastName = "";
  phoneNumber = "";
  vat = 0;
  // currentCountry = "";
  form :FormGroup;
 
   arrName = [];
   prices =[];
   amount = [];
  arrTemp = [];
  arrCity = [];
  price = 0;
  paidFor = false;
  fullAddress = "";
  public city: string; 
	public country: string;
  totalPrice =0;
  firstName="";
  arrDis= [];
  data = [];
  constructor(public authService: AuthService,private router : Router,public route :ActivatedRoute,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,private titleService: Title,public http:HttpClient) { 
// this.getAllCountries();
// this.cityChecked();
}

calculateTotalPrice(){

  this.authService.getUserByEmail(localStorage.getItem("email")).subscribe(data=>{
   
    this.totalPrice=0;
    this.price = 0;          
     console.log( this.user);

   for(let i =0;i<data.user.Cart.products.length;i++){
       this.totalPrice += parseFloat (data.user.Cart.products[i].price);
       this.price +=parseFloat (data.user.Cart.products[i].price);
   }
   this.vat = this.totalPrice*0.16;
   this.totalPrice+=this.vat;
          // this._id=data.user._id;
  })
       return this.totalPrice;

}
  ngAfterViewInit(): void {
    // let product = {};
    console.log("7777777");
    console.log(this.totalPrice);
    window.paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
         
          purchase_units: [
{
            amount:{
              value:this.calculateTotalPrice(),
              currency_code:'USD'
            }
}

          ]
            
          //   {
          //     name:"product",
          //   price:"50",
          //   amount:"3",
          //   // description:this.data[1],
          //   // price:this.data[2],
          //   // amount:this.data[3]._id,
          //   currency_code:'USD'
          //   }
          // ]
        });
      },
     onApprove:(data,actions)=>{
      return actions.order.capture().then(details=>{
        alert("Transaction completed");
        this.paidFor = true;
        location.href= '/confirmation'
      })
     },
     onError:err=>{
       console.log(err);
     }
    })
    .render(this.paypalRef.nativeElement);
  }
 // paypal: any;
getAllProductsDis(){
  this.authService.getUserByEmail(localStorage.getItem("email")).subscribe(data=>{
  
    for(let i=0;i<data.user.Cart.products.length;i++){
      if(data.user.Cart.products[i]!==undefined&&data.user.Cart.amount[i]!==undefined){
        let item = {name:data.user.Cart.products[i].name,price:data.user.Cart.products[i].price,amount:data.user.Cart.amount[i]}
        this.arrName.push(item);
        // this.arrName.push();
        // this.prices.push();
        // this.amount.push();
  
  
      }
    }


      
  })





 
  return this.arrName;
}

  @ViewChild('paypal',{static:false}) private paypalRef:ElementRef;
  
  // ngAfterViewInit(){

  // }
  ngOnInit(): void {
      console.log("####");
      console.log(window.paypal);

      // (window as any).paypalRef.Buttons({
      //   style:{
      //     layout:"horizontal"
      //   }
      // }
      // ).render(this.paypalRef.nativeElement);

    // console.log((window as any).paypal);
    // console.log("####");
    // this.data = this.getAllProductsDis();
    // console.log(this.data);
    // console.log((window as any).paypal);
   



    // paypal.Buttons({
    //  createOrder:(data,actions)=>{
    //   return actions.order.create({
    //     purchase_units :[
    //       {
    //         name:this.data[0].name,
    //         price:this.data[0].price,
    //         amount:this.data[0].amount.number,
    //         // description:this.data[1],
    //         // price:this.data[2],
    //         // amount:this.data[3]._id,
    //         currency_code:'USD'
    //       }
  
    //      ]
        
    //   }); 
      
       
    //  },
    //  onApprove:async(data,actions)=>{
    //    const order = await actions.order.capture();
    //    this.paidFor = true;
    //    console.log(order);
    //  },
    //  onError:err=>{
    //    console.log(err);
    //  }
    // })
    // .render(this.paypalElement.nativeElement);
    this.arrName = this.getAllProductsDis();
    console.log( this.user);

    this.form = new FormGroup({
      firstName:new FormControl(null,{validators:[Validators.required]}),
      lastName:new FormControl(null,{validators:[Validators.required]}),
      phoneNumber:new FormControl(null,{validators:[Validators.required]}),
      country:new FormControl(null,{validators:[Validators.required]}),
      city:new FormControl(null,{validators:[Validators.required]}),
      fullAddress:new FormControl(null,{validators:[Validators.required]}),
      zipCode:new FormControl(null,{validators:[Validators.required]})
     // country:new FormControl(null,{validators:[Validators.required]})
     });
              alert("data.user.email");
              console.log( this.user);

       let email = localStorage.getItem("email");
        this.authService.getUserByEmail(email).subscribe(data=>{
        this.user = data.user;
        //this.city = data.user.address.city;
        
        
        // console.log("@@@@@@@@@@@;@@");
        // console.log( this.user.address);
        // console.log( this.user.address.city);
        // // console.log( );
        // console.log( this.user.address.city.type.name);
        
        // console.log( this.user.address.state.type);

        console.log(this.user);
       this.firstName = data.user.firstName;
       this.lastName = data.user.lastName;
       this.phoneNumber = data.user.phoneNumber;
       this.country = data.user.address.state.name;
        this.city =this.user.address.city.name;
        this.fullAddress = this.user.address.line1;
      //  this.fullAddress = data.user.address.line1;
      //  console.log(data.user.address.line1);
       alert(data.user.address.line1);
       console.log( this.fullAddress);
        this.totalPrice=0;
        this.price = 0;          
         console.log( this.user);

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
                  price : this.totalPrice,

                  country:this.user.address.state.name,
                  city:this.user.address.city.name,
                  address:this.user.address.line1
             });
           });
           console.log( this.user);

    
            
  }
  savePayment(){

  }

  cityChecked(){
    
   
    axios.get<{cities:any[]}>('http://localhost:4500/country/' +this.country).then(data=>{
      console.log( data.data.cities);
      
      data.data.cities.forEach(el=>{

       this.arrCity.push(el.name);
      });
     })
    console.log(this.arrCity);
    

  }
  changeClient(event){
    this.country = event;
    alert(this.country);
    

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


  
   confirmation(){
    let email = localStorage.getItem("email");
    alert("Transaction completed");
    alert(email);
    this.paidFor = true;
    // location.href= '/confirmation';
    let date = new Date();

    
    this.authService.getUserByEmail(email).subscribe(data=>{
    let order = {userId:data.user._id,products:data.user.Cart.products,
      amount:data.user.Cart.amount,status:data.user.Cart.status,address:data.user.address}

      this.http.post("http://localhost:4500/orders/addOrder",order).subscribe(data=>{
               console.log(data);
      })
                console.log(order);
    })
    axios.get("http://localhost:4500/user/saveCartToOrderHistory/info/" + email).then(info=>{
      console.log(info);
    })


    this.router.navigate(["/confirmation"]);

      // this.http.get("http://localhost:4500/orders").subscribe(data=>{
      //   console.log(data);
      // })
    // })
    
  
  //   // /addOrder/:_id/:products/:amount/:address/:status
    
  //   alert("Transaction completed");
  //   this.paidFor = true;
  //   location.href= '/confirmation'
   }


}
