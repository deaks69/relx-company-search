import { Address } from './address';

export interface CompanySearch {
  pageNumber: number;
  kind: string;
  totalResults: number;
  items: CompanySearchItem[];
}

export interface CompanySearchItem {
  companyStatus: string;
  addressSnippet: string;
  dateOfCreation: string;
  dateOfCessation?: string;
  matches: CompanySearchItemMatch;
  description: string;
  descriptionIdentifier: string[];
  links: CompanySearchItemLink;
  companyNumber: string;
  title: string;
  companyType: string;
  address: Address;
  snippet?: string;
  kind: string;
}

export type CompanySearchItemMatch = {
  [K in keyof CompanySearchItem]?: number[];
};

export interface CompanySearchItemLink {
  [key: string]: string;
}
