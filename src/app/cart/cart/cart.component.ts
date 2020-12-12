import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import axios from 'axios'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  imgPath = "";
products =  [];
price=0;
sum = 0 ;
totalPrice =0;
numberOfItems = 0;
amount = [];
vat = 0;
flag= false;
mymodel = "";
 jj :number;
k = 0;
value = 1;
productNoDuplicate = [];
  constructor(public http:HttpClient) { 

  
  }


  valuechange(newValue){
    
    // alert(event);
    this.mymodel = newValue;
    //return newValue;
    console.log(newValue);
    return newValue; 
  }
  setAmount(j){
    // let sum = this.amount[j]*this.products[j].price;
    //this.products[j].price = 0;
    // this.price = this.products[j].price;
    // this.products[j].price = (this.products[j].price*this.amount[j])- this.price ;
    this.amount[j]=this.mymodel;
    this.totalPrice +=parseInt(this.productNoDuplicate[j].price);
   // this.products[j].price = 0;
  console.log( this.products[j].price);
   
  }

  deleteItem(j){
    //alert(this.productNoDuplicate[j]._id);
   
    const email= localStorage.getItem("email");
    //alert(email);
    axios.put<{product:any}>("http://localhost:4500/user/deleteProduct/"+ email +"/" + this.productNoDuplicate[j]._id+"/"+ j).then(data=>{
      console.log(data.data.product)
      this.productNoDuplicate = data.data.product;
      
      window.location.reload();
    })
  }

  

  noDuplicated(){
    var arrStorage = [];
    this.k=0;
    for(let i=0;i<15;i++){
      this.amount[i]=1;
    }
    let k = 0;
    
    for(let i=0;i<this.products.length;i++){
      
    
     if(this.productNoDuplicate.length===0){
       this.amount[0]=1;
      // this.amount[i]=1;
      this.productNoDuplicate.push(this.products[i])
     }else{
      this.flag = false;
       for(let j=0;j<this.productNoDuplicate.length;j++){
        if(this.productNoDuplicate[j]!==undefined){
          if(this.productNoDuplicate[j]._id===this.products[i]._id){
            //this.amount.push(this.amount[i] +1)
             this.amount[j]=this.amount[j]+1;
             //this.k ++;
            

            this.flag = true;
            continue;
         }
        }
            // k=j;
       }
       if(this.flag===false){
        //this.amount[k]=this.amount[k]+1;
       //this.amount[k]++;
       // k++;
        this.productNoDuplicate.push(this.products[i])
       }
      
   
     
     }
     
    }
         

    var arrStorage = [];
    arrStorage = this.amount;
    localStorage.setItem("arrStorage3", JSON.stringify(arrStorage));
    
    //...
    var storedNames = JSON.parse(localStorage.getItem("arrStorage3"));
     console.log(storedNames);
   
    
  }

  ngOnInit(): void {
     const email = localStorage.getItem('email');
     //alert(email);
     this.http.get<{user:AuthData}>("http://localhost:4500/user/info/" +email ).subscribe(data=>{
      //this.imgPath =data.user.imagePath
     
     this.products= data.user.Cart.products
    this.numberOfItems = this.products.length;
    
   
    for(let i =0;i<this.productNoDuplicate.length;i++){
      this.amount[i]=1;
      
    }
    this.noDuplicated();
  



     for(let i =0;i<this.productNoDuplicate.length;i++){
       if(this.productNoDuplicate[i]!==undefined){
         if(this.amount[i]!==NaN&&this.productNoDuplicate[i].price!==NaN){
          this.sum+=(this.amount[i]*this.productNoDuplicate[i].price);
         }
       
        //alert(this.sum);
        this.totalPrice = this.sum;
        console.log( this.price);
       }
       this.vat=this.totalPrice*0.16;

       var arrStorage = [];
       arrStorage = this.amount;
       localStorage.setItem("arrStorage", JSON.stringify(arrStorage));
       
       //...
       var storedNames = JSON.parse(localStorage.getItem("arrStorage"));
        console.log(storedNames);
     
       
    }
   
     
     })
    
    
  }



}
