import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductsService } from 'src/app/product-list/product.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(public productService:ProductsService,public activeRoute:ActivatedRoute,public authService:AuthService) { }

  userImg = "";
  productName = "";
  userName = "";
  ifLoggedIn = false;
  commentMessage = "";
  productId="";
  like = 0;
  dislike = 0;
  commentsArr = [];
  userId="";
  

  ngOnInit(): void {
    console.log('queryParams');
    this.activeRoute.params.subscribe(
     params => 
    this.productId = params['_id']
     );
    this.getComments();
    
    if(this.authService.loggedIn()){
      this.ifLoggedIn = true;
      this.getCurrentUser();

    }
    
  }

  getComments(){
     
    this.productService.getCommentsByProductId(this.productId).subscribe(data=>{
      this.commentsArr = data.comments
      console.log(this.commentsArr);
     
      
    })
  }

  getCurrentUser(){
    this.authService.getUser().subscribe(currentUser=>{
      this.userImg = currentUser.user.imagePath;
      this.userName = currentUser.user.userName;
      this.userId=currentUser.user._id;
      //alert(this.userName);
    })
  }
  addAComment(commentMessage){
    
    this.productService.addCommentToProductById(this.userId,this.productId,commentMessage).subscribe(product=>{
         console.log(product.product);
        // product.product.comments[i]=commentMessage;
         console.log("product####################");

    })
      
  }

}
