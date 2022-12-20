import { Pipe, PipeTransform } from '@angular/core';
import { RentalDetailDto } from '../models/entities/rentalDetailDto';

@Pipe({
  name: 'filterRental'
})
export class FilterRentalPipe implements PipeTransform {

  transform(value: RentalDetailDto[], filterText:string): RentalDetailDto[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:RentalDetailDto)=> c.carName.toLocaleLowerCase()
    .indexOf(filterText)!==-1):value;
  }

}
