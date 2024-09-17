export interface Transaction {
  transactionId: string;
  accountId: string;
  clientId: string;
  transactionType: string;
  paidAmount: number;
  currency: string;
  transactionDate: string;
  paidAt: string;
  status: string;
  description: string;
  remainingBalance: number;
  referenceId: string;
}
