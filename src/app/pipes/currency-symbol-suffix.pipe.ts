import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbolSuffix'
})
export class CurrencySymbolSuffixPipe implements PipeTransform {
  transform(value: number, currencyCode: string = '₺', locale: string = 'tr-TR'): string {
    const formattedValue = new Intl.NumberFormat(locale, { style: 'currency', currency: 'TRY' }).format(value);
    // Sembolü kaldır
    const valueWithoutSymbol = formattedValue.replace(currencyCode, '').trim();
    // Sembolü sona ekle
    return `${valueWithoutSymbol} ${currencyCode}`;
  }
}
