import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

 

  constructor(private colorService: ColorService,
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

}
