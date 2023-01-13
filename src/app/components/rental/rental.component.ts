import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/entities/rental';
import { LocalStorageService } from 'src/app/services/local-storge.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

   rental: Rental;
  addRentCarForm: FormGroup;
  carId: number
  currentDate: Date = new Date();

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private rentalService: RentalService,
    private router: Router) { }

  ngOnInit(): void {
    this.carId = parseInt(this.activatedRoute.snapshot.paramMap.get('carId'));
    this.createAddRentCarForm();
  }

  createAddRentCarForm() {
    this.addRentCarForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      customerId: [this.localStorageService.getCurrentCustomer().customerId, Validators.required],
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


}
