import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories:Category[]=[];
  currentCategory:Category;
  filterText="";
  dataLoaded = false;
  selecetedCategoryIds:number[]=[];
  categoryForm=new FormGroup({
    category:new FormControl(this.categories),
  })

  constructor(private categoryService: CategoryService,
    private router: Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){this.categoryService.getCategories().subscribe
  (response=>{this.categories=response.data;
    this.dataLoaded=true;
  });
}
  
  setCurrentCategory(category:Category){
    this.currentCategory=category
    this.toastrService.info(category.categoryName +" kategorisi listeleniyor")
  }

  getCurrentCategoryClass(category:Category){
    if(category==this.currentCategory){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
  getAllCategoryClass(){
    if (!this.currentCategory){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  onBrandSelect(categoryId: number, event: any): void {
    if (event.target.checked) {
      this.selecetedCategoryIds.push(categoryId);
    } else {
      const index = this.selecetedCategoryIds.indexOf(categoryId);
      if (index > -1) {
        this.selecetedCategoryIds.splice(index, 1);
      }
    }
  }

  filterCars(): void {
    const categoryIdsParam = this.selecetedCategoryIds.join(',');
    this.router.navigate(['/cars/category', categoryIdsParam]);

    const selectedCategoryNames = this.selecetedCategoryIds.map(id => {
      const category = this.categories.find(c => c.categoryId === id);
      return category ? category.categoryName : '';
    }).join(', ');

    this.toastrService.info(selectedCategoryNames +" listeleniyor.");
  

}


 
}
