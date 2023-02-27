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

  loginForm: FormGroup;
  user: User;
  currentCustomerEmail: string = "";

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
   // private localStorgeService: LocalStorageService,
    private userService: UserService) { }

  ngOnInit(): void {

    this.ceratedLoginForm();
  }

  ceratedLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["", Validators.required],
    });
  }
  //  this.toastrService.warning("Bilgiler bi olamamış sanki!")

  login() {
    // this.authService.login(this.loginForm.value).subscribe(
    //   (response)=> {
    //     localStorage.setItem('token', response.data.token);
    //     this.toastrService.success("Giriş Başarılı");
    //     this.router.navigate(["/cars"])
    //   },
    //   (error)=>{
    //     this.toastrService.error(error.error);
    //   }
    // )




    if (this.loginForm.valid) {
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe({
        next: (response) => {
          console.log(response);
          sessionStorage.setItem("token",response.data.token );
          this.toastrService.info(response.message);
          this.router.navigate(['/cars/getdetails']);
          this.getUser(loginModel.email);
         
        },
        error: (responseError) => {
          console.log(responseError)
          this.toastrService.error(responseError.error, 'Hata oluştu!')
        }
    });
    }
    else{
      this.toastrService.warning("HATA!");
    }
  }

  getUser(email:string){
    this.userService.getByEmail(email).subscribe((response=>{
      this.user=response.data;
      console.info(this.user)
      sessionStorage.setItem("fullName", this.user.firstName + " "+ this.user.lastName);
      sessionStorage.setItem("email",this.user.email)



    }))
  }
}
