

import { Component, OnInit, OnDestroy } from '@angular/core';
// @ts-ignore
import {Product} from '../product/product.model';
import {ProductsService} from '../product-list/product.service';
import {Subscription, concat} from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { trigger } from '@angular/animations';
import "src/app/assets/js/script";

import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
// import {Component} from '@angular/core';



@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  implements OnInit, OnDestroy {
  products: Product [] = [];
  panelOpenState = false;
  filteredArrayProduct= [];
  filteredArray =[];
  searchKey = "";
  enteredValue="";
  // public gpusNvidia: Gpu  = [];
  gpusAmd = [];
   nvidia = [];
   value = "";
   filteredArrayLength=0;
    sortType: string;
    sortReverse: boolean = false;
    filteredSearch: Product[];
    //filteredSearch: [];
    des = "";
    companyFiltered = [];
    unique = [];
    _id="";
    isShow = false;
    imagePath = "";
    imgPathCompanyLogo = "";
    price = "";
    productName = "";
    filteredNewArray= [];
    filteredNewArrayLength=0;
    private productSub: Subscription;
    productService: ProductsService;

constructor(productService: ProductsService,public http: HttpClient,private router:Router,public activeRoute:ActivatedRoute) {
  this.productService = productService;
}

  // containsGpu(gpus:any){
  //   gpus = this.gpusService.getAndReturnGpus();
  // }

  

  dynamicSort(property) {
      let sortOrder = -1;

    if (this.sortReverse) {
        sortOrder = 1;
   }
   return function(a, b) {
       let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
   };
 }
sortSearchResult(property) {
  this.sortType = property;
  this.sortReverse = !this.sortReverse;
  this.filteredArrayProduct.sort(this.dynamicSort(property));
}

  clickMe(item:string)
  {
    //alert(item);
    // this.searchKey = "";
    // console.log('queryParams');
    // this.activeRoute.params.subscribe(
    //  params => 
    // this.searchKey = params['searchKey']
    //  );
   

    // if(new String (this.searchKey).valueOf() != new String("item").valueOf()){
    //   this.enteredValue = this.searchKey;
    //   alert("here");
    //   this.enteredValue= this.enteredValue.toUpperCase();
    //   alert( "not equal item");
    // }else{
    //   this.enteredValue = this.enteredValue.toUpperCase();
    //   this.searchKey = this.enteredValue;
    //   alert( this.enteredValue);
    // }
    this.enteredValue = this.enteredValue.toUpperCase();
    // this.products =   this.productService.getProductsAndReturn();
    
    // this.filteredArray = this.productService.getProductByName(this.enteredValue,this.products)
    // .concat(this.productService.getProductByCompany(this.enteredValue,this.products));
    // console.log(this.filteredArray);
    
    // this.filteredArrayProduct = this.filteredArray;
    // console.log(this.filteredArray);
    // this.filteredArrayLength=this.filteredArrayProduct.length;
   
    // this.sortSearchResult('_id');
    // this.filteredSearch = this.filteredArrayProduct;
   location.href = "/search/" + this.enteredValue;
 //(['/search/' +  this.enteredValue]);
 
  // alert(item);

  }

  duplicate(name,arr){
    if(arr.length===0){
      return false;
    }
   for(let i =0;i<arr.length;i++){
     if(arr[i].name===name){
       return true;
     }else{
       return false;
     }
   }
  }

   onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
 
   

  showItems(searchKey:string){
    
    searchKey = searchKey.toUpperCase();

    this.productSub = this.productService.getPostUpdateListner().subscribe((products: Product[]) => {
      this.products = products;
      console.log(products);
      console.log("#########################");

      console.log(this.products);
      console.log(this.products);
     

      
      this.filteredArray = 
    this.productService.getProductByCompany(searchKey,this.products);
    console.log(this.filteredArray);

    //  this.productService.arrayDistinct( this.filteredArray).subscribe(data=>{
    //   console.log(data);
    //   this.companyFiltered = data;
    //   console.log( this.companyFiltered);
    //   this.unique =data.filter(this.onlyUnique);
    //   console.log( this.unique);

    // });
    console.log(  this.filteredArray);
    
    this.filteredArray.forEach(product=>{
      this.companyFiltered.push(product.company);
    })
    this.unique =this.companyFiltered.filter(this.onlyUnique);
    console.log(this.unique);
    console.log("here");
   console.log(this.companyFiltered);
    this.filteredArrayProduct = this.filteredArray;
    console.log(this.filteredArray);
    this.filteredArrayLength=this.filteredArrayProduct.length;
   // this.containsGpu(this.gpus);
    //this.name = this.filteredArray;
    this.sortSearchResult('_id');

    this.filteredSearch = this.filteredArrayProduct;
    // this.filteredArrayProduct.push(this.checkString2(this.enteredValue));

    });

    

  }

 


  ngOnInit(): void {
    this.searchKey = "";
    console.log('queryParams');
    this.activeRoute.params.subscribe(
     params => 
    this.searchKey = params['searchKey']
    
      
     );

     if(this.searchKey!=="item"&&this.searchKey!==undefined&&this.searchKey.length!==0){

     this.showItems(this.searchKey);
     this.searchKey = "";
    
       console.log(this.searchKey);
       console.log("emprty");

     }



    this.filteredArrayLength=0;
    this.filteredNewArrayLength=0;
   this.productService.getProducts();
   this.productSub = this.productService.getPostUpdateListner().subscribe((products: Product[]) => {
     this.products = products;
     console.log(this.products);
    // this.filteredArrayLength= this.products.length;
     
   });

   
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
  }

filterResult(search: string) {
  this.filteredArrayProduct = this.filteredArrayProduct.filter(o =>
    Object.keys(o).some(k => {
      if (typeof o[k] === 'string')
        return o[k].toLowerCase().includes(search.toLowerCase());
    })
  );
}
  filterItemByName(name:any){
  
   // this.filterResult(name)
    console.log(name);
    this.filteredNewArray.push(name);
    this.isShow = !this.isShow;
    this.filteredNewArrayLength=this.filteredNewArray.length;

    // console.log("#########################");
    // console.log(this.filteredArrayProduct);
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@");
    // console.log(this.filteredSearch);
    // console.log("***********************");
    // console.log(this.filteredArrayLength);

}
clickFilter(){
this.filteredNewArrayLength=this.filteredNewArray.length;
  for(let i=0; i< this.filteredNewArray.length;i++){
    if (this.filteredNewArray[i]!= undefined)
    this.filterResult(this.filteredNewArray[i]);
  }
}

//  checkString(str) {    
//   return myStringArray.some(s => s.includes(str));
// }
 checkString2(str) {    
  return this.products.some(function(s) {
    return s.indexOf(str) > -1;
  });
}
  filterItemByCompany(company){
    
    console.log(company);
    this.filteredNewArray.push(name);
    this.filteredNewArrayLength=this.filteredNewArray.length;

    // this.isShow = !this.isShow;
    // console.log("#########################");
    // console.log(this.filteredArrayProduct);
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@");
    // console.log(this.filteredSearch);
    // console.log("***********************");
    // console.log(this.filteredArrayLength);

  }


}



