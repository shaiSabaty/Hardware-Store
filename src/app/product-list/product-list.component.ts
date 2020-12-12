import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
// @ts-ignore
import {Product} from '../product/product.model';
import {ProductsService} from './product.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private authStatusSubs : Subscription;
  userIsAuthenticated = false;

  products: Product [] = [];
  private productsSub: Subscription;
  productsService: ProductsService;
  email = "";
  // id;
 // _id;
 isLoading = false;
  constructor(productsService: ProductsService, private authService : AuthService,public http:HttpClient) {
    this.productsService = productsService;
  }

  ngOnDestroy(): void {
        this.productsSub.unsubscribe();
       // this.authStatusSubs.unsubscribe();
    }

    updateProduct(_id:string){
      this.productsService.getProductById(_id);
    }

    deleteProduct(_id:string){
      this.productsService.deleteProductById(_id);
    }

    checkConnections(){
      return this.authService.loggedIn();
    }
  ngOnInit(): void {


    this.email  = localStorage.getItem("email");
   
    this.isLoading = true;
   
   
   
 this.http.get<{message:string}>("http://localhost:4500/user/checkRole/" + this.email).subscribe(data=>{

     console.log(data.message);
    

    if(data){
      console.log(data.message);
    }
    if(data.message==="admin"){
      
      this.isLoading = true;
     this.productsService.getProducts();
    this.productsSub = this.productsService.getPostUpdateListner().subscribe((products: Product[]) => {
      this.isLoading = false;
      this.products = products;
     })

    }else{
      //this.router.navigate(["/accessDenied"]);
      location.href = "/accessDenied";
    }

      
    });
  
  
  
  }
  }
   
      
   
   
    
 


