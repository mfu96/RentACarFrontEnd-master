import { Injectable } from '@angular/core';
import { Car } from '../models/entities/car';
import { CartItems } from '../models/entities/cartItems';
import { CartItem } from '../models/entities/cartItem';
import { CarDetailDto } from '../models/entities/carDetailDto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:Car){

    let item =CartItems.find(c=> c.car.carId ===car.carId);
    if(item){
      item.quantity+=1
    }
    else{
      let cartItem= new CartItem();
      cartItem.car=car;
      cartItem.quantity=1;

      CartItems.push(cartItem);
    }

  }

  addToCartDetail(detail:CarDetailDto){

    let item =CartItems.find(c=> c.detail.carId===detail.carId);
    if(item){
      item.quantity+=1
    }
    else{
      let cartItem= new CartItem();
      cartItem.detail=detail;
      cartItem.quantity=1;

      CartItems.push(cartItem);
    }

  }

  list():CartItem[]{
    return CartItems;
  }
}
