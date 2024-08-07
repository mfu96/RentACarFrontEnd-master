import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { CreditCardComponent } from './components/credit-card/credit-card/credit-card.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeScreenComponent } from './components/home-screen/home-screen/home-screen.component';
import { RegisterComponent } from './components/auth/register/register.component';

const routes: Routes = [
  { path:"", pathMatch:"full", component:RentalDetailComponent},
  {path:"rentals/getdetails",component:RentalDetailComponent},
  {path:"rental",component:RentalComponent},

  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},


  {path: "cars/getdetails", component:CarDetailComponent },
  {path: "customers/getdetails", component:CustomerDetailComponent},
  {path: "cars/category/:categoryId", component:CarComponent},
  {path: "cars/brand/:brandId", component:CarComponent},
  {path: "cars/color/:colorId", component:CarComponent},
  {path: "cars/detail/:carId", component:CarDetailComponent ,canActivate:[LoginGuard]},

   { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  // {path:"cars/filter/brand/:selectedBrandId/color/:selectedColorId",component:CarComponent},
  // {path:"cars/filter/brand/:brandId/color/:colorId",component:CarComponent},



  {path: "cars", component:CarComponent},
  {path: "cars/carImage/:id", component:CarImageComponent},
  {path: "payment", component: PaymentComponent},

  {path: "home", component:HomeScreenComponent}
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
