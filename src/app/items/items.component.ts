import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ProductsService} from '../product-list/product.service';
import { ActivatedRoute } from '@angular/router';
import "src/app/assets/js/script";
import { ProductModel } from '../product/product.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class  ItemsComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:4500/product/';
  products: any;
  num: number;
  product : any;
  name = "";

  productName = "";
  imagePath = "";
  des = "";
  price = "";
  
  productsService: ProductsService;
  isShow = false;
_idProduct = "";
  constructor(private  http: HttpClient,productsService: ProductsService,public activeRoute:ActivatedRoute,public authService:AuthService) {


    

  


    console.log('queryParams');
    this.activeRoute.params.subscribe(
     params => 
     this.name = params['name']
     );

    this.productsService = productsService;
    this.products =  this.productsService.getProducts();
    
    this.http.get<{cpus: any }>('http://localhost:4500/product/' + this.name
      ).pipe(map((productData)=>{

console.log(productData.cpus);
return productData.cpus.map(cpu=>{
  this._idProduct = cpu._id;
return {
  name:cpu.name,
  company:cpu.company,   
  price:cpu.price,
  imgPath:cpu.imgPath,
  image:cpu.imgPath,
  description:cpu.description,
  imgPathCompanyLogo:cpu.imgPathCompanyLogo,
  numOfStars:cpu.numOfStars,
  _id:cpu._id,
  
  manufacturer:cpu.manufacturer,
  category:cpu.category
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
    
this.http.get<{amdProduct: any }>('http://localhost:4500/product/'
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


  toggleDisplay(id){
    this.isShow = !this.isShow;
  //  alert(id);
    
    this.http.get<{product:ProductModel}>("http://localhost:4500/product/info/" + id ).subscribe((data)=>{

      this.imagePath = data.product.imgPath,
      // this.imgPathCompanyLogo = data.product.imgPathCompanyLogo,
      this.price = data.product.price,
      this.des = data.product.description,
      this.productName = data.product.name
 
 
      })

      const userId = this.authService.getUserId();
      //alert(userId);
      this.authService.getUserById(userId).subscribe(data=>{
        // data.user.
      })

    
  }


  addToCart(productId){
    this.http.get<{product:ProductModel}>("http://localhost:4500/product/info/" + productId ).subscribe((data)=>{

      this.imagePath = data.product.imgPath,
      // this.imgPathCompanyLogo = data.product.imgPathCompanyLogo,
      this.price = data.product.price,
      this.des = data.product.description,
      this.productName = data.product.name
 
 
      })
    this.isShow = !this.isShow;
   // alert("asdasd");
   // alert(productId);
    const userId = this.authService.getUserId();
     this.http.get<{product:ProductModel}>("http://localhost:4500/product/info/" + productId).subscribe(data=>{
      this.product = data.product
      console.log("%%%");
      console.log(this.product);
       this.authService.getUserById(userId).subscribe(data=>{
      
        // data.user.Cart.products.push(
        //   this.product
        // )
        // console.log(data.user);
        const user = {};
        this.http.put("http://localhost:4500/user/addToCart/"+ userId + "/" + productId,user).subscribe(data=>{

        })
      })
    });
    
   
   // this.productsService.addToCart(productId,userId);
    //alert(userId);
    console.log(this.product);
    
  }

  

 
// }

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
