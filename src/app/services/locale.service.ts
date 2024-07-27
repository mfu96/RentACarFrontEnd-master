import { Injectable } from '@angular/core';
import { LOCALE_ID } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor() { }

  //Tarayııcı diline göre tarih sonuçları içindir
  getBrowserLocale(): string {
    const locale = navigator.language || (navigator as any).userLanguage;
    const supportedLocales = ['tr', 'en', 'de', 'fr', 'es'];
    const defaultLocale = 'en';

    const matchingLocale = supportedLocales.find((supportedLocale) => locale.startsWith(supportedLocale));
    return matchingLocale || defaultLocale;
  }

    //Tarayııcı diline göre ücret sonuçları içindir
  getCurrencyByLocale(locale: string): string {
    const currencyMap: { [key: string]: string } = {
      'tr': 'TRY',
      'en': 'USD',
      'de': 'EUR',
      'fr': 'EUR',
      'es': 'EUR'
    };
    return currencyMap[locale] || 'USD';
  }
}




//Yapılmasıı gerekenler
//app.module.ts de importları eklemeyi unutma
//örnek: import { registerLocaleData } from '@angular/common';
//       import localeTr from '@angular/common/locales/tr'; ...
//        registerLocaleData(localeTr, 'tr');
//        registerLocaleData(localeEn, 'en');

//app.module.ts de provider eklemeyi unutma
// providers: [
//   {
//     provide: LOCALE_ID,
//     deps: [LocaleService],
//     useFactory: (localeService: LocaleService) => localeService.getBrowserLocale()
//   }

// kullanacağın component.ts ve html  de ekleme yap
// değişken:   currentCurrency: string;
// constructor:   private localeService: LocaleService
//ngOnInit içine ekelencek
//    const locale = this.localeService.getBrowserLocale();
    //this.currentCurrency = this.localeService.getCurrencyByLocale(locale);

// html de pipe olarak ekle
// örnek:            <td>{{ detail.unitPrice | currency :currentCurrency }} </td>

