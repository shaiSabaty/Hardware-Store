import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

 
  constructor(public http : HttpClient) { }

  getAllCategories(){
    return this.http.get<{categoryName:any}>("http://localhost:4500/category");
  }
  addNewCategory(name:string,imgPath:string){
    let item = {name,imgPath:imgPath};
   
   return this.http.post("http://localhost:4500/category",item);

  }
  deleteCategoryByName(name:string){
    return this.http.delete("http://localhost:4500/category/"+ name);
  }
}
