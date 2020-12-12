// @ts-ignore
import {Product} from '../product/product.model';
import {Subject} from 'rxjs';
import {Injectable, ɵConsole} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {map} from 'rxjs/operators';
import { ProductListComponent } from './product-list.component';
import { Router } from '@angular/router';
import Axios from 'axios';

 @Injectable({providedIn: 'root'})
export  class ProductsService {
    constructor(public http: HttpClient,private router:Router){}
  //private gpus;
  private products: Product  = [140];
  private productsAmd: Product  = [140];
  private   productsNvidia: Product  = [140];
  
  private productsUpdated = new Subject<Product[140]>();
  // tslint:disable-next-line:typedef
   
  getProductByName(key,products){
    
    let array = new Array [150];
    array =  products.filter(data=>data.key===key
    
    //  return data.name===name|| data.company===name;
    );
    console.log(array);
    return array;
  }
  // getAllCompanies(name,gpus){
  //   let array;
  //   array =  gpus.filter(data=>data.name===name
  //   //  return data.name===name|| data.company===name;
  //   );
  //   return array;
  // }
  getProductById(_id:string){
   return this.http.get< {product:any}>('http://localhost:4500/product/info/' +_id);
  }


  nvidiaProducts(products:any){
    const productsNvidia = [];
    for(let i=0;i<products.length;i++){
        if(products[i].name.includes("Nvidia")){
          productsNvidia.push(products[i]);  
        
    }
    return  productsNvidia;

  
  }
}

  

  searchProduct(name:string){
    return this.http.get< {name:string;company:string;
    price:string;
    imgPath:string;
    description:string;
    imgPathCompanyLogo:string;
    numOfStars:string;
    _id:string;
     category:string;
     manufacturer:string;
  
  }>('http://localhost:4500/product/' +name);
   }

  getProductByCompany(company,products){
    // let array= [130];
     let products2 = [];
    // array =  products.filter(data=>{
    // //  alert(products.length)
    // if(data.company===company){
    //   products2.push(data);
    // }
   
     
    // });
    //alert(array.length);
    for(let i =0;i<products.length;i++){
      ///'a nice string'.includes('nice') //true

      if(products[i].company.toUpperCase()===company.toUpperCase()||
      products[i].name.toUpperCase()===company.toUpperCase()||
      products[i].name.toUpperCase().includes(company.toUpperCase())||
      products[i].description.toUpperCase().includes(company.toUpperCase())
      ){
        products2.push(products[i]);
      }
    }
    return products2;
  }

  getAllCategory(){
  return  this.http.get<{categories : string[]}>("http://localhost:4500/product/distinct/productCategories");

  }
  getAllManuFacturer(){
    return  this.http.get<{manufacturers : string[]}>("http://localhost:4500/product/distinct/productManufacturer");

  }
 
  getAllProductNames(){
    return  this.http.get<{productNames : string[]}>("http://localhost:4500/product/distinct/productName");
  }
  arrayDistinct(arr){
   arr= this.http.get<{companies : any}>("http://localhost:4500/product/distinct/productCompany");
   return arr;
  }
  

  getAndReturnProducts(){
    //return [...this.gpus];
     //this.http.get<{gpus: Gpu[]}>('http://localhost:4500/gpu').subscribe((gpuData)=>{
   return this.http.get<{products: any}>('http://localhost:4500/product');
    //  this.products = productData.products ;
    //  console.log(gpuData);
    //   console.log(this.gpus);
    //   console.log("this one");
     
  
      
      // this.productsUpdated.next([...this.products]);
     
     
 
    //console.log(this.products);
   
  }



  getProducts(){
     //this.http.get<{gpus: Gpu[]}>('http://localhost:4500/gpu').subscribe((gpuData)=>{
    this.http.get<{products: any }>('http://localhost:4500/product'
    ).pipe(map((productData)=>{
    
    // console.log(gpuData.gpus);
   return productData.products.map(product=>{
    return {
      name:product.name,
      company:product.company,   
      price:product.price,
      imgPath:product.imgPath,
      description:product.description,
      imgPathCompanyLogo:product.imgPathCompanyLogo,
      numOfStars:product.numOfStars,
      _id:product._id,
      manufacturer:product.manufacturer,
      category:product.category

    };
   });
    }))
    .subscribe((products)=>{
     this.products = products;
      // console.log(gpus);
       this.productsUpdated.next([...this.products]);
    });
    return this.products;
  }


  getProductsAndReturn(){
    //const gpusTemp = [];
    //this.http.get<{gpus: Gpu[]}>('http://localhost:4500/gpu').subscribe((gpuData)=>{
   this.http.get<{products: any }>('http://localhost:4500/product'
   ).pipe(map((productData)=>{
   
  //  console.log(gpuData.gpus);
  return productData.products.map(product=>{
   return {
     name:product.name,
     company:product.company,   
     price:product.price,
     imgPath:product.imgPath,
     description:product.description,
     imgPathCompanyLogo:product.imgPathCompanyLogo,
     numOfStars:product.numOfStars,
     _id:product._id,
      category:product.category,
      manufacturer:product.manufacturer
   };
  });
   }))
   .subscribe((products)=>{
    this.products = products;
      console.log(products);
      this.productsUpdated.next([...this.products]);
   });
   return this.products;
 }
  
  // tslint:disable-next-line:typedef
  addProduct( name: string, company: string, price: string,  description: string, imgPathCompanyLogo: string, numOfStars: string,image:File,manufacturer:string,category:string,key:string){
    // const gpu: Gpu = {
    //   _id:null,
    //   name,
    //   company,
    //   price,
    //   imgPath,
    //   description,
    //   imgPathCompanyLogo,
    //   numOfStars
    // };
    
    const productData = new FormData();
    productData.append("_id",null);
    productData.append("manufacturer",manufacturer);
    productData.append("category",category);
    productData.append("name",name);
    productData.append("company",company);
    // gpuData.append("imgPath",imgPath);
    productData.append("description",description);
    productData.append("imgPathCompanyLogo",imgPathCompanyLogo);
    productData.append("numOfStars",numOfStars);
    productData.append("price",price);
    productData.append("image",image,name);
    productData.append("key",key);

    this.http.post<{product: Product}>('http://localhost:4500/product',productData).subscribe(data=>{
        const product: Product = {_id:data.product._id,name:name,company:company,price:price,
          imgPath:data.product.imgPath,description:description,imgPathCompanyLogo:imgPathCompanyLogo,
          numOfStars:numOfStars,manufacturer:manufacturer,category:category,key:key
        };
      this.products.push(product);
      this.productsUpdated.next([...this.products]);
       this.router.navigate(["/products"]);
       console.log(product);
       alert(product.category);
    });
   
  }
  deleteProductById(_id:string){
    // console.log(_id);
    this.http.delete('http://localhost:4500/product/'+_id).subscribe(()=>{
     const updatedProducts = this.products.filter(product=>product._id!==_id);
      this.products = updatedProducts;
      this.productsUpdated.next([...this.products]);

    });
  }

  updateProduct(_id:string,name:string,company:string,price:string,description:string,numOfStars:string,imgPathCompanyLogo:string,image:File | string,manufacturer:string,category:string ,key:string){
          let productData : Product | FormData;
       if(typeof(image)==="object"){
        productData = new FormData();
        productData.append("name",name);
        productData.append("company",company);
        productData.append("manufacturer",manufacturer);
        productData.append("category",category);
        productData.append("price",price);
          // gpuData.append("imgPath",imgPath);
          productData.append("description",description);
          productData.append("numOfStars",numOfStars);
          productData.append("_id",_id);
          productData.append("image",image,name);
          productData.append("key",key);

       }else{
        productData = {
          _id:_id,
          name:name,
          company:company,
          price:price,
          imgPath:image,
          description:description,
          numOfStars:numOfStars,
          imgPathCompanyLogo:imgPathCompanyLogo
          ,category:category,
          manufacturer:manufacturer,
          key:key
         };

       }
      //  const gpu: Gpu = {name:name,_id:_id,price:price,company:company,imgPathCompanyLogo:imgPathCompanyLogo,imgPath:imgPath,description:description,numOfStars:numOfStars};
       this.http.put('http://localhost:4500/product/'+_id,productData).subscribe(res=>{
        const updateProducts = [...this.products];
        const oldProductInd = updateProducts.findIndex(p=>p._id===_id);
        const product : Product = {name:name,_id:_id,price:price,company:company,imgPathCompanyLogo:imgPathCompanyLogo,imgPath:image,description:description,numOfStars:numOfStars,
        category:category,manufacturer:manufacturer,key:key
        };
        updateProducts[oldProductInd]=product;
        this.products = updateProducts;
        this.productsUpdated.next([...this.products]);
        this.router.navigate(["/products"]);
       });
  }



 
  

  // tslint:disable-next-line:typedef
  getPostUpdateListner(){
    return this.productsUpdated.asObservable();
  }

  addToCart(productId:string,userId:string){

    


  }

  getCommentsByProductId(productId){
   
   return this.http.get<{comments:any}>("http://localhost:4500/product/getCommentsByProductId/"+productId);


  }

  addCommentToProductById(userId:string,productId:string,message:string ){
          let item = {message:message};
    return this.http.post<{product:any} >("http://localhost:4500/product/addCommentToProductComments/"+userId+"/"+productId+"/"+message,item.message);
 
 
   }
  

}

