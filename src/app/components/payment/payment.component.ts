import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/entities/car';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { CreditCard } from 'src/app/models/entities/creditCard';
import { Rental } from 'src/app/models/entities/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental:Rental;
  car:Car;
  detailCar: CarDetailDto;

  cardNumber:string;
  nameOnTheCard:string;
  expirationDate: string;
  cvv: number;
  cardId: number;

  creditCards:CreditCard[]=[];
  creditCardAddForm:FormGroup;

  //Cerenden


  constructor(private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private carService:CarService,
    private roter: Router,
    private toastrService:ToastrService,
    private paymentService:PaymentService) { }

  ngOnInit(): void {
  }

}
