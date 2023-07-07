import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/entities/cartItem';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

 cartItems:CartItem[];
 
  constructor() { }

  ngOnInit(): void {
  }

}
