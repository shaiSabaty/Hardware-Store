import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent implements OnInit {
  dataSource;
  userName;
  products = [ ];
   orders  = axios.get("http://localhost:4500/orders").then(data=>{
     console.log(data.data);
     
     data.data.orders.forEach(element => {
     
      
      // data2.user.orderHistory.forEach(data3=>{
      //   console.log(data3)
      // })
           
           console.log(element.products)
        let order = { orderId:element._id,
          userName:  element.userId,
          address: element.address.line1,
          status: element.status,
          date: element.date,
          products:element.products
        }
        this.products = order.products;
          ELEMENT_DATA.push(order);
          this.dataSource = ELEMENT_DATA;
       });


     
     
    
   })
   
  
  
  columnsToDisplay = ['orderId','userName', 'address', 'status', 'date'];
  expandedElement: PeriodicElement | null;
  constructor(public http : HttpClient,public authService:AuthService) { }

  ngOnInit(): void {

    let email  = localStorage.getItem("email");
   
   
   
   
   
 this.http.get<{message:string}>("http://localhost:4500/user/checkRole/" + email).subscribe(data=>{

     console.log(data.message);
    

    if(data){
      console.log(data.message);
    }
    if(data.message==="admin"){
      
      
    

    }else{
      //this.router.navigate(["/accessDenied"]);
      location.href = "/accessDenied";
    }

      
    });
  



    console.log(this.dataSource);
    // this.authService.getUser$().subscribe(data2=>{
    //   this.userName = data2.userName
    // })
  }

}

export interface PeriodicElement {
  orderId: number;
  userName: string;
  address: string;
  status: string;
  date: string;
  products:[];
}

const ELEMENT_DATA: any[] = [
  // {
  //   orderId: 1,
  //   userName: 'Hydrogen',
  //   address: "1.0079",
  //   status: 'H',
  //   date: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
  //       atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  // }
  // axios.get("http://localhost:4500/orders")
];