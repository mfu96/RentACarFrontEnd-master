import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/entities/carDetailDto';
import { CartItem } from 'src/app/models/entities/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

 cartItems:CartItem[]=[];
 
  constructor(private cartService:CartService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {

    this.getCart();
  }

  getCart(){
    this.cartItems=this.cartService.list();
  }

  removeFromCart(detail:CarDetailDto){
    this.cartService.removeFromCart(detail);
    this.toastrService.warning("Silindi", detail.carName+ " sepetten silindi")
  }

}
