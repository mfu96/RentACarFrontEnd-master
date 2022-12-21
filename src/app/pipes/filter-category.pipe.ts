import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/entities/category';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: Category[], filterText:string): Category[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((ct:Category)=>ct.categoryName.toLocaleLowerCase()
    .indexOf(filterText)!==-1):value
  }

}
