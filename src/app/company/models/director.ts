import { Address } from './address';

export interface Director {
  activeCount?: number;
  resignedCount?: number;
  inactiveCount?: number;
  totalResults: number;
  etag: string;
  links: DirectorLink;
  kind: string;
  itemsPerPage: number;
  items: DirectorItem[];
}

export interface DirectorLink {
  [k: string]: string;
}

export interface DirectorItem {
  address: Address;
  name: string;
  appointedOn: string;
  resignedOn?: string;
  officerRole: string;
  links?: DirectorLink;
  dateOfBirth: DateOfBirth;
  occupation: string;
  countryOfResidence: string;
  nationality: string;
}

export interface DateOfBirth {
  month: number;
  year: number;
}
