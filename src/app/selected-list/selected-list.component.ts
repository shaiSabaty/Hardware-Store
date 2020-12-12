import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product/product.model';
import { ProductsService } from '../product-list/product.service';
@Component({
  selector: 'app-selected-list',
  templateUrl: './selected-list.component.html',
  styleUrls: ['./selected-list.component.css']
})
export class SelectedListComponent implements OnInit {

  productModel:ProductModel  [];
  productsService : ProductsService;
  enteredValue : '';
  constructor( productsService:ProductsService) {
    this.productsService = productsService;
   }
 
  ngOnInit(): void {
  }

}
