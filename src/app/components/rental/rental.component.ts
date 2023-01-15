import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/entities/car';
import { Customer } from 'src/app/models/entities/customer';
import { Rental } from 'src/app/models/entities/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storge.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rental:Rental;
  carId:number;

  addRentCarForm: FormGroup;
  currentDate: Date = new Date();





  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private rentalService: RentalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carId = parseInt(this.activatedRoute.snapshot.paramMap.get('carId'));
    this.createAddRentCarForm();
    

  }

  createAddRentCarForm() {
    this.addRentCarForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      customerId: [this.localStorageService.getCurrentCustomer().customerId==1, Validators.required],
      rentDate: ['', [Validators.required]],
      returnDate: ['', Validators.required]

    });
  }

  setRentingCar() {
    if (this.addRentCarForm.invalid) {
      this.toastrService.warning('Tanımsız alan!');
      return false;
    }

    this.rental = this.addRentCarForm.value;
    let rentDate = new Date(this.rental.rentDate);
    let returnDate = new Date(this.rental.rentDate);

    if (rentDate < this.currentDate) {
      this.toastrService.warning(
        "Kiralama Tarihi aynı gün olamaz ", "setRentingCar"
      )
      return false;

    }
    if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
      this.toastrService.warning("Dönüş tarihi kiralama tarihinden önce ve eşit olamaz");
      return false;
    }
    this.rentalService.setRentingCar(this.rental);

    this.toastrService.success("Yallah ödeme sayfasına")
    console.log("rental eklendi")
    return this.rentalService.addRental(this.rental)

  }

  checkCarRentable() {
    this.rentalService.getByRentalId(this.carId).subscribe(response => {
      if (response.data[0] == null) {
        this.setRentingCar();
        return true;
      }

      let lastItem = response.data[response.data.length - 1];

      if (lastItem.returnDate == null) {
        return this.toastrService.error('Araç henüz teslim edilmedi')
      }

      let returnDate = new Date(lastItem.returnDate)
      this.setRentingCar();

      if(new Date(this.rental.rentDate)<returnDate){
        this.rentalService.removeRentingCar();
        this.toastrService.warning("Araç bu tarhiler arasında kiralanamaz")
      }

      return true;

    })
  }


 // isLogOK(){
    //  return true
    // }
  
  
  
    // getCustomer() {
    //   this.customerService.getCustomer().subscribe((response) => {
    //     this.customers = response.data;
    //     console.log("customer çalıştı mı?")
    //   });
    // }
  
    // //Bu günün tarihini veriyor  YYYY-AA-GG
    // getDate(day: number) {
    //   var today = new Date();
    //   today.setDate(today.getDate() + day);
    //   console.log(today.toISOString().slice(0, 10));
    //   return today.toISOString().slice(0, 10);
    // }
  
    // create() {
    //   let rental: Rental = 
    //   {
    //     carId: this.car.carId,
    //     customerId: parseInt(this.customerId.toString()),
    //     rentDate:this.rentDate,
    //     returnDate:this.returnDate
    //   };
    //   this.rentalService.addRental(rental).subscribe(response=>{
    //     this.toastrService.success("Kiralama Başarılı");
        
    //   },error=>{
    //     console.info(error)
    //     this.toastrService.warning("Kiaralama başarısız")
    //   })
  
    // }
}
