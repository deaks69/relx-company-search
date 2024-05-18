import { describe, expect, test } from 'vitest';
import { AddressPipe } from './address.pipe';
import { Address } from '../models/address';

describe('AddressPipe', () => {
  const pipe = new AddressPipe();

  test('should return an empty string if address is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  test('should format the address correctly with all fields', () => {
    const address: Address = {
      premises: '123',
      addressLine1: 'Main St',
      addressLine2: 'Suite 100',
      locality: 'Anytown',
      postalCode: '12345',
      country: 'USA',
    };
    const result = pipe.transform(address);
    expect(result).toBe('123, Main St, Suite 100, Anytown, 12345, USA');
  });

  test('should format the address correctly with some fields missing', () => {
    const address: Address = {
      addressLine1: 'Main St',
      locality: 'Anytown',
      postalCode: '12345',
    } as unknown as Address;
    const result = pipe.transform(address);
    expect(result).toBe('Main St, Anytown, 12345');
  });

  test('should handle empty address object gracefully', () => {
    const address: Address = {} as unknown as Address;
    const result = pipe.transform(address);
    expect(result).toBe('');
  });

  test('should correctly format address without trailing comma', () => {
    const address: Address = {
      addressLine1: 'Main St',
      locality: 'Anytown',
      country: 'USA',
    } as unknown as Address;
    const result = pipe.transform(address);
    expect(result).toBe('Main St, Anytown, USA');
  });
});
