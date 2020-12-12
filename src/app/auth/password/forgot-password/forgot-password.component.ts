import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading = false;
  constructor(public authService : AuthService) { }

  resetPass(resetPassForm :NgForm){
    if(resetPassForm.invalid){
      return;
    }
    this.isLoading = true;
    //alert(form.value.email);
    this.authService.resetPassword(resetPassForm.value.email);
    
  }

  ngOnInit(): void {
  }

}
