import { Address } from './Address-data.model';
import { from } from 'rxjs';
import {UserCartSchema} from '../cart/userCart-data.model';
export interface AuthData{
   email:string,
    password:string,
    userName :string,
    firstName :string,
    lastName :string,
    phoneNumber :string,
    _id:string,
    googleId:string,
    
    imagePath:string,
    address:Address,
    isActive:boolean,
    Cart : UserCartSchema,
    orderHistory: [] ,
    role:string
}