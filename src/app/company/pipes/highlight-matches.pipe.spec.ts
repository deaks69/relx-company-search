import { describe, expect, test } from 'vitest';
import { HighlightMatchesPipe } from './highlight-matches.pipe';
import {
  CompanySearchItem,
  CompanySearchItemMatch,
} from '../models/company-search';

describe('HighlightMatchesPipe', () => {
  const pipe = new HighlightMatchesPipe();

  test('should return the original value if no matches are provided', () => {
    const value = 'Test Company';
    const result = pipe.transform(
      value,
      {},
      'name' as unknown as keyof CompanySearchItem,
    );
    expect(result).toBe(value);
  });

  test('should return the original value if match positions are not provided for the key', () => {
    const value = 'Test Company';
    const resultMatches: CompanySearchItemMatch = { address: [1, 4] };
    const result = pipe.transform(
      value,
      resultMatches,
      'name' as unknown as keyof CompanySearchItem,
    );
    expect(result).toBe(value);
  });

  test('should highlight matches correctly', () => {
    const value = 'Test Company';
    const resultMatches: CompanySearchItemMatch = {
      name: [1, 4, 6, 9],
    } as unknown as CompanySearchItemMatch;
    const result = pipe.transform(
      value,
      resultMatches,
      'name' as unknown as keyof CompanySearchItem,
    );
    expect(result).toBe('<b><mark>Test</mark></b> <b><mark>Comp</mark></b>any');
  });

  test('should return the original value if match positions are not in pairs', () => {
    const value = 'Test Company';
    const resultMatches: CompanySearchItemMatch = {
      name: [1, 4, 6],
    } as unknown as CompanySearchItemMatch;
    const result = pipe.transform(
      value,
      resultMatches,
      'name' as unknown as keyof CompanySearchItem,
    );
    expect(result).toBe(value);
  });

  test('should handle empty value gracefully', () => {
    const value = '';
    const resultMatches: CompanySearchItemMatch = {
      name: [1, 4],
    } as unknown as CompanySearchItemMatch;
    const result = pipe.transform(
      value,
      resultMatches,
      'name' as unknown as keyof CompanySearchItem,
    );
    expect(result).toBe(value);
  });

  test('should handle undefined match positions gracefully', () => {
    const value = 'Test Company';
    const resultMatches: CompanySearchItemMatch = {
      name: undefined,
    } as unknown as CompanySearchItemMatch;
    const result = pipe.transform(
      value,
      resultMatches,
      'name' as unknown as keyof CompanySearchItem,
    );
    expect(result).toBe(value);
  });
});
