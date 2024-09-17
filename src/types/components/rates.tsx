export interface Rate {
  rateId: string;
  fixedRate: number;
  startDate: string;
  endDate: string;
  rateType: string;
  currency: string;
  description: string;
  status: string;
  period: number;
}
