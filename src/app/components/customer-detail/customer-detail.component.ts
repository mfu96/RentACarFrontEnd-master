import { Component, OnInit } from '@angular/core';
import { CustomerDetailDto } from 'src/app/models/entities/customerDetailDto';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
 customerDetails:CustomerDetailDto[]=[]
  dataLoaded=false;

  constructor(private customerService:CustomerService) { }


  ngOnInit(): void {
this.getCustomerDetails();
  }
  getCustomerDetails(){this.customerService.getCustomerDetails()
    .subscribe(response=>{this.customerDetails=response.data;
      this.dataLoaded=true;})}
}
