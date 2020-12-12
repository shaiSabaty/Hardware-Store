import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogMessageComponent } from '../../dialog-message/dialog-message.component';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// import script from './script';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  // constructor(public authService: AuthService,
  //   private renderer2: Renderer2,
  //   @Inject(DOCUMENT) private _document) {

  // }
  constructor(public authService: AuthService) {

  }

  googlelogin(){
    
    
    
    this.authService.logInWithGoogle();

    }


    facebookLogIn(){
      alert("asdasdasdasdasdas");
      
      this.authService.facebookLogIn();
  
      }

  

  onLogin(form :NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    //alert(form.value.email);
    this.authService.logIn(form.value.email,form.value.password);
  }

 

  ngOnInit(): void {
    //this.openDialog();

  
   
    }
  

}
