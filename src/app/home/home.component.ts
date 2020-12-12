import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { Gpu } from '../gpu/product.model';
import "src/app/assets/js/script";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public http:HttpClient) { 
    
    
  }

  gpus :any;
  something = '';
  newProduct = '';
  param = '';
  cpus:any;
  arrGpus =[];
  arrCpus =[];
  powerSupply:any
  ;cases:any;
  memoryRam:any

  storedGpus: Gpu[] = [];
  // tslint:disable-next-line:typedef
  randomGpus(gpus:any){
    
    
    for(let i = 0 ; i<5;i++){
      var item = gpus[Math.floor(Math.random() * gpus.length)];
      if(item!==undefined){
        this.arrGpus.push(item);
      }
      
    }
    console.log( this.arrGpus);
    //this.newProduct = this.something;
  }

  randomCpus(cpus:any){
    let arr = [];
    
    for(let i = 0 ; i<5;i++){
      var item = cpus[Math.floor(Math.random() * cpus.length)];
      this.arrCpus.push(item);
    }
    console.log(arr);
    //this.newProduct = this.something;
  }
  // tslint:disable-next-line:typedef
  clicked(data: HTMLTextAreaElement){
    this.param = data.value;
  }

  ngOnInit(): void {
    
   this.http.get<{gpus:any,cpus:any,powerSupply:any,cases:any,memoryRam:any}>("http://localhost:4500/product/getProductByGroup").subscribe(data=>{
      this.gpus = data.gpus;
      this.cpus = data.cpus;
      this.powerSupply = data.powerSupply;
      this.cases = data.cases;
      this.memoryRam = data.memoryRam;
       this.randomGpus(this.gpus);
       this.randomCpus(this.cpus);
       //this.doSomething(this.cpus);
   })
   

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
  // tslint:disable-next-line:typedef
  onGpuAdded(gpu){
    this.storedGpus.push(gpu);
  }
  

}
