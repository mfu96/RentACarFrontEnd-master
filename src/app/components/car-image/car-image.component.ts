import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/entities/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  images:CarImage[]=[];
  imagePath:String;
  dataLoaded=false;


  constructor(private carImageService:CarImageService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getImageById(params["id"])
      }
    })

  }

  getImageById(id:number){
    this.carImageService.getImageById(id).subscribe(response=>{
      this.images=response.data;
      this.dataLoaded=true;
    });
  }

  
}
