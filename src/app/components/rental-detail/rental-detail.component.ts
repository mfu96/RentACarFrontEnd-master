import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/entities/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {
rentalDetails:RentalDetailDto[]=[];
dataLoaded=false;

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }
  getRentalDetails(){this.rentalService.getRentalDetails()
  .subscribe(response=>{this.rentalDetails=response.data;
  this.dataLoaded=true;})}

}
