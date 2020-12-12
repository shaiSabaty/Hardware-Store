import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent implements OnInit {
  savePasswordForm :NgForm
  isLoading = false;
  _idUser = "";
  constructor(public authService : AuthService,public activeRoute:ActivatedRoute) { }

  savePassword(savePasswordForm){
    if(savePasswordForm.invalid){
      return;
    }
    this.isLoading = true;
    //alert(form.value.email);
    this.authService.createNewPassword(savePasswordForm.value.password,savePasswordForm.value.confirmPassword,this._idUser);
    
  }

  ngOnInit(): void {

    // this.activeRoute.queryParams.subscribe((params: Params) => {
    //   let context = params['_id'];
    //   //this.context = context;
    //   console.log(context);
    // });

    console.log('queryParams');
       this.activeRoute.params.subscribe(
        params => 
       this._idUser = params['_id']
        );
        console.log(this._idUser);
    
 
    
  }

}
