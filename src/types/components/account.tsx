export enum AccountStatus {
  Active = "Active",
  InActive = "Inactive",
}

export enum PaymentFrequency {
  Month = "Monthly",
  Fortnightly = "Fortnightly",
  Weekly = "Weekly",
}

export enum RateType {
  Fixed = "Fixed Rate",
  Variable = "Variable Rate",
}

export interface AccountSummary {
  accountId: string;
  accountName: string;
  accountNumber: string;

  effectiveDate: string;
  effectiveDateEnd: string;
  maturityDate: string;
  nextPaymentDate: string;
  lastPaymentDate: string;
  nextPaymentAmount: number;
  currency: string;
}

export interface Account extends AccountSummary {
  clientId: string;
  loanId: string;
  accountType: string;
  status: AccountStatus;
  loanAmount: number;
  remainingBalance: number;
  interestRate: number;
  paymentFrequency: PaymentFrequency;
  lastPaymentAmount: number;
  loanType: RateType;
  currency: string;
  requireRefix: boolean;
  period: number;
}
