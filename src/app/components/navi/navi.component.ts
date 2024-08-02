import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  
  isAuthenticated: boolean = false; // Başlangıçta false
  userName: string = ''; // Başlangıçta boş

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAuthStatus(); // Oturum durumunu kontrol eder
  }

  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated(); // Oturum açılmış mı?
    this.userName = this.authService.getUserName(); // Kullanıcı adını al
  }

  logout() {
    this.authService.logOut(); // Oturum kapat
    this.checkAuthStatus(); // Oturum durumunu güncelle
  }
}