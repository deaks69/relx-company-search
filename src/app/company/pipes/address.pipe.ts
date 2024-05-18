import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address';

@Pipe({
  name: 'address',
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(value: Address | undefined): string {
    if (!value) {
      return '';
    }

    let address = '';
    if (value.premises) {
      address += `${value.premises}, `;
    }
    if (value.addressLine1) {
      address += `${value.addressLine1}, `;
    }
    if (value.addressLine2) {
      address += `${value.addressLine2}, `;
    }
    if (value.locality) {
      address += `${value.locality}, `;
    }
    if (value.postalCode) {
      address += `${value.postalCode}, `;
    }
    if (value.country) {
      address += `${value.country}`;
    }
    // Remove trailing comma
    address = address.replace(/, $/, '');

    return address.trim();
  }
}
