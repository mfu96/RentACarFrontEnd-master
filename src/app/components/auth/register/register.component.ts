import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/entities/registerModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, firstName, lastName, password, passwordConfirm } = form.value;

      // Şifrelerin eşleşip eşleşmediğini kontrol et
      if (password !== passwordConfirm) {
        this.passwordMismatch = true;
        return;
      } else {
        this.passwordMismatch = false;
      }

      const registerModel: RegisterModel = {
        email,
        firstName,
        lastName,
        password
      };

      this.authService.register(registerModel).subscribe(
        response => {
          console.log('Kayıt başarılı!', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Kayıt başarısız.', error);
        }
      );
    }
  }
}


