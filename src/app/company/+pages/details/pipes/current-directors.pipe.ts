import { Pipe, PipeTransform } from '@angular/core';
import { Director } from '../../../models/director';

@Pipe({
  name: 'currentDirectors',
  standalone: true,
})
export class CurrentDirectorsPipe implements PipeTransform {
  transform(value: Director | null | undefined): string {
    if (!value || !value.items) {
      return '0 officers / 0 resignations';
    }

    const { active, resigned } = value.items.reduce(
      (acc, item) => {
        if (item.resignedOn) {
          acc.resigned++;
        } else {
          acc.active++;
        }
        return acc;
      },
      { active: 0, resigned: 0 },
    );

    return `${active} officers / ${resigned} resignations`;
  }
}
