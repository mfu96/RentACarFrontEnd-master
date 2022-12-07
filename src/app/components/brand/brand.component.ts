import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  dataLoaded = false;

  //private yazmamızın sebebi dışardaki classlar'dan ulaşılmasını engellemek
  constructor(private brandService: BrandService) {}
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
}
