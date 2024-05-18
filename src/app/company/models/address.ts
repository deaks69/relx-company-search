export interface Address {
  premises: string;
  postalCode: string;
  country?: string;
  locality: string;
  region?: string;
  addressLine1: string;
  addressLine2?: string;
  kind?: string;
  descriptionIdentifier?: string[];
}
