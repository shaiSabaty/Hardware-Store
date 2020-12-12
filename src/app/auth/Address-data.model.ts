import { City } from './City-data.model';
import { Country } from './Country-data.model';
export interface Address{
    line1:string,
    line2:string,
    city:City,
    state:Country,
    zip:String


}