import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ProductModel} from '../../app/product/product.model';
@Component({
  selector: 'app-item-full-page',
  templateUrl: './item-full-page.component.html',
  styleUrls: ['./item-full-page.component.css']
})
export class ItemFullPageComponent implements OnInit {

  _idProduct  = "";
  imagePath = "";
  imgPathCompanyLogo = "";
  name= "";
  description = "";
  price = "";
  constructor(public activeRoute:ActivatedRoute,public http:HttpClient) { }
  
  ngOnInit(): void {
    console.log('queryParams');
    this.activeRoute.params.subscribe(
     params => 
    this._idProduct = params['_id']
     );
     
     this.http.get<{product:ProductModel}>("http://localhost:4500/product/info/" + this._idProduct ).subscribe((data)=>{

     this.imagePath = data.product.imgPath,
     this.imgPathCompanyLogo = data.product.imgPathCompanyLogo,
     this.price = data.product.price,
     this.description = data.product.description,
     this.name = data.product.name


     })
     
  }

}
