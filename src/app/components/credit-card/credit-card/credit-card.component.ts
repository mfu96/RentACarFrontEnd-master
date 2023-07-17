import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/entities/car';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { Rental } from 'src/app/models/entities/rental';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
