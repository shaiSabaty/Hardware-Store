import { Comment } from './../comments/comment-data.model';

export  interface ProductModel {
  name: string;
  _id: string;
  company: string;
  price: string;
  imgPath: string;
  description: string;
  imgPathCompanyLogo: string;
  numOfStars: string;
  key: string;
  manufacturer:string;
  category:string;
  amount:number;
  comments:[Comment]
}
