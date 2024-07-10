import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from 'src/app/services/brand.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand ;
  dataLoaded = false;
  
  filterText="";
  //selectedBrand:string=null;

  selectedBrandIds: number[] = [];

  // brandForm = new FormGroup({
  //   brand: new FormControl(this.brands),
  // });
  


  //private yazmamızın sebebi dışardaki classlar'dan ulaşılmasını engellemek
  constructor(private brandService: BrandService,
    private router: Router,
    private toastrService:ToastrService) {}
  //constractor C#/Java/Python dillerinini hepsinde instance'sini
  //üretmek için vardır(new'lemek için)

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
    this.toastrService.info(brand.brandName + " markası listeleniyor")
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllBrandClass(){
    if(!this.currentBrand){
      return'list-group-item active';
    }
    else {
      return 'list-group-item';
    }
  }


  onBrandSelect(brandId: number, event: any): void {
    if (event.target.checked) {
      this.selectedBrandIds.push(brandId);
    } else {
      const index = this.selectedBrandIds.indexOf(brandId);
      if (index > -1) {
        this.selectedBrandIds.splice(index, 1);
      }
    }
  }

  filterCars(): void {
    const brandIdsParam = this.selectedBrandIds.join(',');
    this.router.navigate(['/cars/brand', brandIdsParam]);

    const selectedBrandNames = this.selectedBrandIds.map(id => {
      const brand = this.brands.find(b => b.brandId === id);
      return brand ? brand.brandName : '';
    }).join(', ');

    this.toastrService.info(selectedBrandNames +" marka araçlar listeleniyor.");
  }
  isFilterActive(): boolean {
    return this.selectedBrandIds.length > 0;
  }

}
