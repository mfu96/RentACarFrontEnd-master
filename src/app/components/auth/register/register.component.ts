import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/entities/loginModel';
import { RegisterModel } from 'src/app/models/entities/registerModel';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storge.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorage: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", Validators.required], // Backend'de firstName olarak geçiyor
      lastName: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(3)]],
       passwordConfirm: ["", Validators.required]
    });
  
    // Form kontrolörlerini konsola yazdırma
    this.registerForm.valueChanges.subscribe(value => {
      console.log("Form Değerleri:", value);
      console.log("Email geçerli mi?", this.registerForm.get('email').valid);
      console.log("First Name geçerli mi?", this.registerForm.get('firstName').valid);
      console.log("Last Name geçerli mi?", this.registerForm.get('lastName').valid);
      console.log("Password geçerli mi?", this.registerForm.get('password').valid);
      console.log("Password Confirm geçerli mi?", this.registerForm.get('passwordConfirm').valid);
    });
  }
  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.passwordConfirm) {
        this.toastrService.error('Şifreler eşleşmiyor!');
        return;
      }
  
      let registerModel: RegisterModel = Object.assign({}, this.registerForm.value);
      delete registerModel.passwordConfirm;
  
      this.authService.register(registerModel).subscribe({
        next: (response: any) => {
          this.toastrService.success("Kayıt başarılı!", response.message);
  
          // Kayıt olduktan sonra otomatik giriş yap

          let loginModel = { email: registerModel.email, password: registerModel.password };
          this.authService.login(loginModel).subscribe({
            next: (loginResponse: any) => {
              localStorage.setItem('token', loginResponse.data.token);
              this.authService.setUser(loginModel.email);
              
              this.toastrService.success("Otomatik giriş başarılı!");
              this.router.navigate(['rentals/getdetails']);
            },
            error: (loginError) => {
              this.toastrService.error(loginError.error, 'Otomatik giriş başarısız.');
            }
          });
        },
        error: (responseError) => {
          this.toastrService.error(responseError.error, 'Kayıt başarısız.');
        }
      });
    } else {
      this.toastrService.warning("Lütfen tüm alanları doğru şekilde doldurunuz!");
    }
  }

}
