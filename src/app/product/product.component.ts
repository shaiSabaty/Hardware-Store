import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ProductsService} from '../product-list/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:4500/product';
  products: any;
  num: number;
  productsService: ProductsService;
  constructor(private  http: HttpClient,productsService: ProductsService) {
    this.productsService = productsService;
    this.products =  this.productsService.getProducts();
    
    this.http.get<{products: any }>('http://localhost:4500/product'
      ).pipe(map((productData)=>{

console.log(productData.products);
return productData.products.map(product=>{
return {
  name:product.name,
  company:product.company,   
  price:product.price,
  imgPath:product.imgPath,
  image:product.imgPath,
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
  console.log(products);
  // this.gpusUpdated.next([...this.gpus]);
});

    console.log("#########################");
    console.log(this.products);
    console.log("#########################");
    this.num = 5;
    //////////////////////////////////



    this.productsService = productsService;
    this.products =  this.productsService.getProducts();
    
this.http.get<{amdProduct: any }>('http://localhost:4500/product'
).pipe(map((productData)=>{

console.log(productData.amdProduct);
return productData.amdProduct.map(product=>{
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
  console.log(products);
  // this.gpusUpdated.next([...this.gpus]);
});

    console.log("#########################");
    console.log(this.products);
    console.log("#########################");
    this.num = 5;
  }

  // tslint:disable-next-line:typedef
  getProducts() {
   // this.gpus = this.http.get(this.ROOT_URL);
  }

  ngOnInit(): void {
    //this.gpusService.getGpus();
  }

}


// this.http.get<{gpus: any }>('http://localhost:4500/gpu'
// ).pipe(map((gpuData)=>{

// console.log(gpuData.gpus);
// return gpuData.gpus.map(gpu=>{
// return {
//   name:gpu.name,
//   company:gpu.company,   
//   price:gpu.price,
//   imgPath:gpu.imgPath,
//   description:gpu.description,
//   imgPathCompanyLogo:gpu.imgPathCompanyLogo,
//   numOfStars:gpu.numOfStars,
//   _id:gpu._id

// };
// });
// }))
// .subscribe((gpus)=>{
//  this.gpus = gpus;
//   console.log(gpus);
//    this.gpusUpdated.next([...this.gpus]);
// });
