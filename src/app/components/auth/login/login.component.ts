import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlSegmentGroup } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/entities/loginModel';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storge.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  user:User;
  currentCustomerEmail:string="";

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private localStorgeService:LocalStorageService,
    private userService:UserService) { }

  ngOnInit(): void {
  }

  ceratedLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:[this.currentCustomerEmail, [Validators.required, Validators.email]],
      password:['',Validators.required]
    });
  }

  login(){
    if (this.loginForm.invalid){
      this.toastrService.warning("Bilgiler bi olamamış sanki!")
    }

    let loginModel:LoginModel=Object.assign({}, this.loginForm.value);

    this.authService.login(loginModel).subscribe(responeSuccess=>{
      this.toastrService.success(responeSuccess.message, "Başarılı");
      this.localStorgeService.setToken(responeSuccess.data);
      //this.localStorgeService.set("email", this.loginForm.get("email")?.value)
      this.getUserByEmail(loginModel.email)
    })
  }


  getUserByEmail(email: string) {
    this.userService.getUserDetails(email).subscribe(responseSuccess => {
    // = responseSuccess.data;
      // this.localStorageService.setCurrentCustomer(this.user);
    });
 }


}
