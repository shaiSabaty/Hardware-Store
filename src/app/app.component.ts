import { Component } from '@angular/core';
import { AuthData } from './auth/auth-data.model';
// import { setupMaster } from 'cluster';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
   
    //this.authService.setUser();
  
  }
   
  //storedGpus = [];
  // tslint:disable-next-line:typedef
  //  onGpuAdded(gpu){
  //    this.storedGpus.push(gpu);
  //  }
}
