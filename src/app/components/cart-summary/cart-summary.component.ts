import { Component, OnInit } from '@angular/core';
import { cartItem } from 'src/app/models/entities/cartItem';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

 cartItems:cartItem[];
 
  constructor() { }

  ngOnInit(): void {
  }

}
