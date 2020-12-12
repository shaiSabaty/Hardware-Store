import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public categoriesService:CategoriesService) { }
  categoriesArr  = [];
  categoryName = "";
  imgPath = "";
  images = [];
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe(data=>{
      this.categoriesArr = data.categoryName
     console.log( this.categoriesArr);
    
    })
  }

  addCategory(name:string,imgPath:string){
    alert("Inset Complete Into Category");
   
    this.categoriesService.addNewCategory(name,imgPath).subscribe(data2=>{
      console.log(data2);
    });
    this.refreshOnes();
  }

  deleteCategory(name:string){
  
    alert("Delete Complete");
    this.categoriesService.deleteCategoryByName(name).subscribe(data2=>{
      console.log(data2);
    });
  
    this.refreshOnes();
  }

  refreshOnes(){
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }


}
