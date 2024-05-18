export class ViewCompanyError extends Error {
  companyNumber: string;

  constructor({
    message,
    companyNumber,
  }: {
    message: string;
    companyNumber: string;
  }) {
    super();
    this.message = message;
    this.name = 'ViewCompanyError';
    this.companyNumber = companyNumber;
  }
}
