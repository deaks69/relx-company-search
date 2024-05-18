import { Pipe, PipeTransform } from '@angular/core';
import {
  CompanySearchItem,
  CompanySearchItemMatch,
} from '../models/company-search';

@Pipe({
  name: 'highlightMatches',
  standalone: true,
})
export class HighlightMatchesPipe implements PipeTransform {
  transform(
    value: string | undefined,
    resultMatches: CompanySearchItemMatch,
    key: keyof CompanySearchItem,
  ): string {
    if (!value) {
      return '';
    }
    if ((value && !resultMatches) || !resultMatches[key]) {
      return value as string;
    }

    let highlightedValue = '';
    const matchPositions = (resultMatches[key] as number[]).map(
      (position) => position - 1,
    );

    if (matchPositions.length % 2 !== 0) {
      console.error('Match positions should be in pairs.');
      return value;
    }

    let lastIndex = 0;

    for (let i = 0; i < matchPositions.length; i += 2) {
      const start = matchPositions[i];
      const end = matchPositions[i + 1] + 1;

      // Append the part before the match
      highlightedValue += value.slice(lastIndex, start);

      // Append the highlighted match
      highlightedValue += `<b><mark>${value.slice(start, end)}</mark></b>`;

      // Update lastIndex to end
      lastIndex = end;
    }

    // Append the remaining part of the string
    highlightedValue += value.slice(lastIndex);

    return highlightedValue;
  }
}
