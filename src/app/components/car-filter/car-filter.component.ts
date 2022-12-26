import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/entities/brand';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands:Brand[];
  colors:Color[];


  filterText="";
  selectedBrand:string=null;
  selectedColor:string=null;
  routeLink="";

  constructor(private brandService:BrandService,private colorService:ColorService) { }

  ngOnInit(): void {

    this.getBrands();
    this.getColors();
  }

  checkFilterClass(){
    if(this.selectedBrand||this.selectedColor)
    {
      return "btn btn-primary me-3"
    }
    else{
      return "btn btn-primary me-3 disabled"
    }
  }

  routingLink(){
    if(this.selectedBrand!=null&&this.selectedColor!=null)
    {
      return "/cars/brand/"+this.selectedBrand+"/cars/color/"+this.selectedColor
    }
    else if(this.selectedBrand!=null&& this.selectedColor==null)
    {
      return "/cars/brand/"+this.selectedBrand
    }
    else if(this.selectedBrand==null&&this.selectedColor!=null)
    {
      return "/cars/color/"+this.selectedColor
    }
    else
    {
      return "cars/getdetails"
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands=response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors=response.data
    })
  }
}
