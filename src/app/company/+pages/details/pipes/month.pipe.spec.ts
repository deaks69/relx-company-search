import { describe, expect, test } from 'vitest';
import { MonthPipe } from './month.pipe';

describe('MonthPipe', () => {
  const pipe = new MonthPipe();

  test('should return an empty string if the value is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  test('should return the correct month name for a valid month number', () => {
    expect(pipe.transform(1)).toBe('January');
    expect(pipe.transform(2)).toBe('February');
    expect(pipe.transform(3)).toBe('March');
    expect(pipe.transform(4)).toBe('April');
    expect(pipe.transform(5)).toBe('May');
    expect(pipe.transform(6)).toBe('June');
    expect(pipe.transform(7)).toBe('July');
    expect(pipe.transform(8)).toBe('August');
    expect(pipe.transform(9)).toBe('September');
    expect(pipe.transform(10)).toBe('October');
    expect(pipe.transform(11)).toBe('November');
    expect(pipe.transform(12)).toBe('December');
  });

  test('should return an empty string for an invalid month number', () => {
    expect(pipe.transform(0)).toBe('');
    expect(pipe.transform(13)).toBe('');
    expect(pipe.transform(-1)).toBe('');
  });
});
