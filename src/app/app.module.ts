import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { RentalComponent } from './components/rental/rental.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterRentalPipe } from './pipes/filter-rental.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CreditCardComponent } from './components/credit-card/credit-card/credit-card.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeScreenComponent } from './components/home-screen/home-screen/home-screen.component';
import { CurrencySymbolSuffixPipe } from './pipes/currency-symbol-suffix.pipe';





@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    NaviComponent,
    CustomerDetailComponent,
    CarDetailComponent,
    CategoryComponent,
    CarComponent,
    CustomerComponent,
    CarImageComponent,
    RentalComponent,
    RentalDetailComponent,
    FilterRentalPipe,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCategoryPipe,
    CarFilterComponent,
    LoginComponent,
    CreditCardComponent,
    CartSummaryComponent,
    PaymentComponent,
    HomeScreenComponent,
    CurrencySymbolSuffixPipe
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
