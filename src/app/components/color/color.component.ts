import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor:Color;
  dataLoaded = false;
  filterText="";
  selectedColorIds:number[]=[];
  

 

  constructor(private colorService: ColorService,
    private router: Router,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getColors();
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    });
  }

 setCurrentColor(color:Color){
   this.currentColor= color;
   this.toastrService.info(color.colorName + " renkler listeleniyor")
 }
 getCurrentColorClass(color:Color){
   if(color==this.currentColor){
     return 'list-group-item active'
   }
   else{
     return 'list-group-item'
   }
 }
  getAllColorClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  
  onColorSelect(colorId: number, event: any): void {
    if (event.target.checked) {
      this.selectedColorIds.push(colorId);
    } else {
      const index = this.selectedColorIds.indexOf(colorId);
      if (index > -1) {
        this.selectedColorIds.splice(index, 1);
      }
    }
  }

  filterCars(): void {
    const colorIdsParam = this.selectedColorIds.join(',');
    this.router.navigate(['/cars/color', colorIdsParam]);

    const selectedcolorNames = this.selectedColorIds.map(id => {
      const color = this.colors.find(c => c.colorId === id);
      return color ? color.colorName : '';
    }).join(', ');

    this.toastrService.info(selectedcolorNames +" rengindeki araçlar listeleniyor.");
  
}

  isFilterActive(): boolean {
    return this.selectedColorIds.length > 0;
  }

}
