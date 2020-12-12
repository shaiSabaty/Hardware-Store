

// @ts-ignore
import {Product} from '../product.model';
import {FormGroup, FormControl,Validators} from '@angular/forms';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ParamMap } from '@angular/router';

import { ProductListComponent } from 'src/app/product-list/product-list.component';
//var jwt = require('jwt-simple');

//import * as jwt from 'jwt-simple';
// import { JwtModule } from 'jwt-decode';



import {Component, OnInit, Input, OnDestroy, ErrorHandler} from '@angular/core';
import {Subscription} from 'rxjs';
// @ts-ignore
import {Product} from '../product/product.model';

import {ProductsService} from '../../product-list/product.service';
import { AuthService } from '../../auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/auth/dialog-message/dialog-message.component';
import { ThrowStmt } from '@angular/compiler';
import { HttpClient, HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private authStatusSubs : Subscription;
  userIsAuthenticated = false;
  user : AuthData;
  users: AuthData [] = [];
  private usersSub: Subscription;
  userName = "";
  mode = 'signup';
  email = "";
  // id;
    _id:string;
    isAdmin = false;
 form : FormGroup;
 isLoading = false;
 private sub:any = null;
  constructor( private authService : AuthService,public route :ActivatedRoute,public router: Router,public http : HttpClient) {
    if (!authService.loggedIn()) {
      //  this.location.replace('/home');
     // expect(location.path()).toBe('/home');
     //window.location('/home');
   //this.location.replaceState('/home'); // clears browser history so they can't navigate with back button
   //  this.router.navigate(['home']);
//    this.router.navigateByUrl('http://localhost:4200/home');
//    this.router.events.subscribe(val=>{
      
//     console.log(val instanceof NavigationEnd) 
//     this.router.navigateByUrl('http://localhost:4200/home');
//  })
  
  }

  
  }

 

  ngOnDestroy(): void {
        this.usersSub.unsubscribe();
       // this.authStatusSubs.unsubscribe();
    }

    updateUser(_id:string){
      this.authService.getUserById(_id);
    }

    deleteUser(_id:string){
      alert(_id);
      this.authService.deleteUserById(_id);
     // alert("asd");deleteUser
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
      
      this.authService.getUsers();
      //console.log(this.authService.getUsers());
      this.usersSub = this.authService.getUserUpdateListner().subscribe((users: AuthData[]) => {
  
        this.isLoading = false;
        this.users = users;
        this.users
        console.log(this.users);
     // console.log(data);
     })

    }else{
      //this.router.navigate(["/accessDenied"]);
      location.href = "/accessDenied";
    }

      
    });
  
    // this.isAdmin =true;
    // if(this.isAdmin){
    //   this.authService.getUsers();
    //   //console.log(this.authService.getUsers());
    //   this.usersSub = this.authService.getUserUpdateListner().subscribe((users: AuthData[]) => {
  
    //     this.isLoading = false;
    //     this.users = users;
    //     this.users
    //     console.log(this.users);
    //  // console.log(data);
    //  })
    // }

    
    


   
    // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authStatusSubs =   this.authService.getAuthStatusListner().subscribe(isAuthenticated=>{
    //   this.userIsAuthenticated = isAuthenticated;
    // });
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




  }
 

}
