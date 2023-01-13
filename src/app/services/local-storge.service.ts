import { Injectable } from '@angular/core';
import { Customer } from '../models/entities/customer';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  tokenKey: string = 'token';
  currentCustomer: string = 'currentCustomer';


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

 setCurrentCustomer(currentCustomerValue: Customer) {
    localStorage.setItem(this.currentCustomer, JSON.stringify(currentCustomerValue));
 }

 getCurrentCustomer(): Customer {
    return JSON.parse(localStorage.getItem(this.currentCustomer));
 }

 removeCurrentCustomer() {
    localStorage.removeItem(this.currentCustomer);
 }
}
