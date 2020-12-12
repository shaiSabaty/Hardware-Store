import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase';
import { Subscription, Subject } from 'rxjs';
import { AuthData } from '../auth/auth-data.model';
import { async } from 'rxjs/internal/scheduler/async';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  isLoading = false;
 // email = "";
  email : string = "" ;
  firstName: string  = "" ;
  lastName : string = "" ;
  phoneNumber : string = "" ;
  message: string = "";
 


  constructor(public authService : AuthService,public http:HttpClient) { 
    
   // this.email = this.authService.getEmailFromLocalStorage();
  }
  form :NgForm;
  onContact(form){
    if(!this.authService.loggedIn()){
      if(form.invalid){
        return;
      }
    }
    
    
    this.isLoading = true;
    //alert(form.value.email);
   
    this.authService.contactUs(form.value.email,form.value.phoneNumber,form.value.message,form.value.firstName,form.value.lastName);
  }
  ngOnInit(): void {
    //let user = {email:""};
       if(this.authService.loggedIn()){
        const _id = this.authService.getUserId();
         this.authService.getUserById(_id).subscribe(data=>{
          const userMessage = {email:data.user.email,phoneNumber:data.user.phoneNumber,message:this.form.value.message,firstName:data.user.firstName,lastName:data.user.lastName};
          this.http.post<{from:string,phoneNumber:string,message:string,firstName:string,lastName:string}>("http://localhost:4500/user/contact-us",userMessage).subscribe(data=>{
            
          });
       this.email = data.user.email,
      
       this.firstName = data.user.firstName,
       this.lastName = data.user.lastName,
       this.phoneNumber = data.user.phoneNumber

     });
   
       }
      
     
    
  }

}
