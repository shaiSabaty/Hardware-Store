import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from '../product-list/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  productsService: ProductsService;
  name: any ;
  readonly ROOT_URL ;
  products: any [];
  products2: any;
  num: number;
  enteredValue = '';
  arrProduct: any[];
  constructor(productsService: ProductsService,public route :ActivatedRoute) {
    this.productsService = productsService;
    this.products = [];
   // this.ROOT_URL = 'http://localhost:4500/' + document.getElementById('name');
    //this.gpus = this.gpusService.getGpus();
  //  this.num = 5;
   // this.gpus2 = '';
   // this.enteredValue = '';

  }
  searchItemButton(name:string){
    // this.arrProduct=this.gpusService.getGpuByName(name,this.gpus);
    // console.log( this.arrProduct);
    name = this.enteredValue ;
    //this.gpus = this.http.get(this.ROOT_URL);
   // console.log(this.gpus);
    alert(name);
    //getGpusAndReturn
    this.products = this.productsService.getProducts();
    console.log("before");
    console.log(this.products);
    //console.log(this.gpus2);
    this.products2 = this.productsService.getProductByName(name,this.products);
    console.log(this.products2);
    console.log("after");
    
  }
  // tslint:disable-next-line:typedef
  getProducts() {
    this.products2 = this.productsService.getProductByName(name,this.products);
    console.log(this.products2);
    //this.gpus2 = this.gpus;
  }

  ngOnInit(): void {


  }

}
