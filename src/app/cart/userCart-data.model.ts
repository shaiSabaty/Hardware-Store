import {ProductModel} from '../product/product.model';
export interface UserCartSchema{
    products :[ProductModel],
    amount :[],
    status :string
}