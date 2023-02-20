import { Injectable } from '@angular/core';
import { Customer } from '../models/entities/customer';
import { User } from '../models/entities/user';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  tokenKey: string = 'token';
  currentUser: string = 'currentUser';


  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string) {
    return this.localStorage.getItem(key);
  }

  set(key: string, value: any) {
    this.localStorage.setItem(key, value);
  }

  remove(key: string) {
    this.localStorage.removeItem(key);
  }

  clear() {
    this.localStorage.clear();
  }

  setToken(tokenValue: TokenModel) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenValue));
 }

 getToken(): TokenModel {
    return JSON.parse(localStorage.getItem(this.tokenKey));
 }

 removeToken() {
    localStorage.removeItem(this.tokenKey);
 }

 setCurrentUser(currentUserValue: User) {
    localStorage.setItem(this.currentUser, JSON.stringify(currentUserValue));
 }

 getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.currentUser));
 }

 removeCurrentUser() {
    localStorage.removeItem(this.currentUser);
 }
}
