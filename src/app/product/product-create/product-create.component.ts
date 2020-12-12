import { Component, OnInit , Output} from '@angular/core';
import axios from 'axios';
// @ts-ignore

import {ProductModel} from '../product.model';
// import {Category} from ;

import {FormGroup, FormControl,Validators} from '@angular/forms';
import {ProductsService} from '../../product-list/product.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import {mineType} from './mine-type.validator';
import { ProductListComponent } from 'src/app/product-list/product-list.component';
import { HttpClient } from '@angular/common/http';
import { map, elementAt } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: ProductModel;
   enteredContent = '';
   isLoading = false;
  enteredTitle = '';
   mode = 'create';
   select = "";
   arrayCategory: any;
   email = "";
   imagePreview: string;
   _id : string;
   selected:string;
   //selected = 'option2';
   form:FormGroup;
  name :"";
   arrTemp =[];
  // selected:any;
  filtered :any;
  chosen:string;
  categories : any;
  constructor(public  productsService: ProductsService,public route :ActivatedRoute, public http:HttpClient) {
  this.getAllCategories();
  console.log(this.arrTemp);
   }
  // tslint:disable-next-line:typedef
 getAllCategories(){

  axios.get<{categoryName:any[]}>('http://localhost:4500/category').then(a=>{
   (a.data.categoryName.forEach(el=>{
     
    this.arrTemp.push(el.name);
    
     
    
   }));
  
   //console.log( this.arrTemp);
 })
 
 }

 
 onSelect(){
  this.chosen = this.selected;
 }

onOptionsSelected() {
 // console.log(this.selected); 
  //this.filtered = this.arrayCategory.filter(t=>t.value ==this.selected);

}
 // numOfStars = '';
  // tslint:disable-next-line:typedef
  onAddProduct(){
   //this.numOfStars=form.value.numOfStars;
 
//    if (form.value.numOfStars>5 || form.value.numOfStars<1){
//     form.value.numOfStars.input.invalid = true;
//   //  form.value.numOfStars.input.mat-error("asdas");
 
// }

//    if (this.form.invalid){
   
//    return;
//  }

// if (this.form.invalid){
//   alert("error");
// validateVerticalPosition
//   return;
// }
  alert(this.form.value.category);
  
  
 this.isLoading = true;
 if(this.mode==='create'){
   this.onSelect();
   //alert(this.form.value.category);
   this.productsService.addProduct(this.form.value.name,this.form.value.company, this.form.value.price,
     this.form.value.description, this.form.value.imgPathCompanyLogo, this.form.value.numOfStars,this.form.value.image,this.form.value.manufacturer ,this.chosen,this.form.value.key);
 }else{
 // alert(this.form.value.category);
   this.productsService.updateProduct(this._id,this.form.value.name, this.form.value.company, this.form.value.price,
     this.form.value.description, this.form.value.imgPathCompanyLogo, this.form.value.numOfStars,this.form.value.image,
     this.form.value.manufacturer,this.form.value.category,this.form.value.key)
 }

//  this.gpusService.addGpu(form.value.name, form.value.company, form.value.price,
//    form.value.imgPath, form.value.description, form.value.imgPathCompanyLogo, form.value.numOfStars);

this.form.reset();
  }


  onImagePicker(event:Event){
     const file = (event.target as HTMLInputElement).files[0];
     this.form.patchValue({image:file});
     this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    //  console.log(file);
    //  console.log(this.form);
  }
  

  ngOnInit() {
    
    this.email  = localStorage.getItem("email");
   // alert(this.email);
  // this.getAllCategories();
  // console.log(this.getAllCategories());
   // this.isLoading = true;
   this.http.get<{message:string}>("http://localhost:4500/user/checkRole/" + this.email).subscribe(data=>{

     console.log(data.message);
    

    if(data){
      console.log(data.message);
    }
    if(data.message==="admin"){
     // alert(data.message);
     console.log(this.arrTemp);
     // console.log(this.getAllCategories());
   // this.arrayCategory=this.getAllCategories();
    //console.log(this.arrayCategory);
    this.form = new FormGroup({
     // categoryName:new FormControl("",{validators:[Validators.required]}),
     name:new FormControl(null,{validators:[Validators.required]}),
     key:new FormControl(null,{validators:[Validators.required]}),
     manufacturer:new FormControl(null,{validators:[Validators.required]}),
     category:new FormControl(null,{validators:[Validators.required]}),
     company:new FormControl(null,{validators:[Validators.required]}),
     price:new FormControl(null,{validators:[Validators.required]}),
     imgPath:new FormControl(null,{validators:[Validators.required]}),
     imgPathCompanyLogo:new FormControl(null,{validators:[Validators.required]}),
     numOfStars:new FormControl(null,{validators:[Validators.required]}),
     description:new FormControl(null,{validators:[Validators.required]}),
     image:new FormControl(null,{validators:[Validators.required],
      asyncValidators:[mineType]})
     
    });
       this.route.paramMap.subscribe((paramMap:ParamMap)=>{
         if(paramMap.has('_id')){
           this.mode = 'edit';
           
           this._id = paramMap.get('_id');
           this.isLoading = true;
           
            this.productsService.getProductById(this._id).subscribe(data=>{
              this.isLoading = false;
              console.log(data);
              
              this.product=data.product;
              
             
            //  this.product = {_id:data._id,name:data.name,company:data.company,numOfStars:data.numOfStars,imgPath:data.imgPath,
            //   imgPathCompanyLogo:data.imgPathCompanyLogo,description:data.description,price:data.price,manufacturer:data.manufacturer,category:data.category}
          console.log(this.product);
          
          console.log("#$$$$$$$$$$$$$$$$$$$$$$$E");
          // console.log(this.product.category)
           this.form.setValue({

            
             name: this.product.name,
            company: this.product.company,
            numOfStars:this.product.numOfStars,
            imgPathCompanyLogo: this.product.imgPathCompanyLogo,
            imgPath: this.product.imgPath,
            description: this.product.description,
            price: this.product.price,
            image: this.product.imgPath,
            manufacturer: this.product.manufacturer,
            category: this.product.category,
            key: this.product.key
          });
          console.log(data);
          //  console.log(this.gpu.name);
          });
         }else{
           this.mode ='create';
           this._id = null;
         }

       });

    }else{
      //this.router.navigate(["/accessDenied"]);
      location.href = "/accessDenied";
    }

      
    });
   
  }

}
