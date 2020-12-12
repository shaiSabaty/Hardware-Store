import { Address } from './../../app/auth/Address-data.model';
import { from } from 'rxjs';
import {UserCartSchema} from '../cart/userCart-data.model';
export interface OrderData{
   email:string,
  
    userId:string,
    address:Address,
    status:string,
    products: [] ,
    amount: [] 
}