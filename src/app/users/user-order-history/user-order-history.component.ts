import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import axios from 'axios';
@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})


export class UserOrderHistoryComponent implements OnInit {

  constructor(public http:HttpClient,public authService:AuthService) { 

    
  }
  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];
  
  _id = "";
  products = [];
  arrNamesAndPrice = [];
  // dataSource = ELEMENT_DATA;
  ordersNames =  [];
  arr = [];
  ngOnInit(): void {

    this.authService.getUserByEmail(localStorage.getItem("email")).subscribe(data=>{
     
      
       axios.get("http://localhost:4500/orders/" + data.user._id ).then((data2)=>{
         let i = 0;
        //  let arr = [];
         let arrNamesAndPrice = [];
        data2.data.order.forEach(element => {
          i=i+1;
          
          // element.products.forEach(p => {
          //   let item = {price:p.price,name:p.name,date:element.date};
          //   if(item.date===element.date){
          //     this.arrNamesAndPrice.push(item);
          //   }
           
          // });
          // for(let i =0;i<element.products.length;i++){

          // }
          
          let order = {date:element.date,products:element.products}
          this.arr.push(order);
        });
        //  this.products = this.arr;
        //  this.products.forEach(element => {
        //    element.
        //  });

        // console.log(arr);
     //  this.namesOfProduct =  data.user.orderHistory.filter(p=>ordersNames.push(p));
      //  this.imagePath = data.product.imgPath,
      //  this.imgPathCompanyLogo = data.product.imgPathCompanyLogo,
      //  this.price = data.product.price,
      //  this.description = data.product.description,
      //  this.name = data.product.name
      //data2.data.order.products.filter(p=>this.ordersNames.push(p.name));
  
       console.log(data2);
       })
    })
   
  }

}
