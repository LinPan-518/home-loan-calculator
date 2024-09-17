import { roundNumber } from "./currencyHelper";

export interface HomeLoan {
  loanAmount: number; // Total loan amount
  loanTermYears: number; // Loan term in years
  fixedRate: number; // The fixed rate applied to the loan
  lastPaymentDate: string;
}
// calculate end date based on period and start date
export function calculateEndDate(startDate: string, periodInYears: number) {
  if (!startDate) {
    return "";
  }
  const date = new Date(startDate);
  // Calculate whole years and the remaining fractional year as months
  const wholeYears = Math.floor(periodInYears);
  const remainingMonths = Math.round((periodInYears - wholeYears) * 12);

  // Add the full years
  date.setFullYear(date.getFullYear() + wholeYears);
  // Add the remaining months
  date.setMonth(date.getMonth() + remainingMonths);
  return date.toISOString();
}

// calculate new home loan end date and payment value
export function calculateRepayment(homeLoan: HomeLoan) {
  const { loanAmount, loanTermYears, fixedRate } = homeLoan;
  // Convert annual interest rate from percentage to a decimal
  const annualInterestRate = fixedRate / 100;

  // Monthly interest rate
  const monthlyInterestRate = annualInterestRate / 12;

  // Total number of monthly payments
  const numberOfPayments = loanTermYears * 12;

  // Calculate the monthly repayment using the formula:
  const monthlyPay =
    ((loanAmount / 100) * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const monthlyRepayment = roundNumber(monthlyPay);

  return monthlyRepayment;
}

// calculate new home loan end date
export function calculateLoanTermYears(
  principal: number,
  monthlyPayment: number,
  annualInterestRate: number,
  startDate: string,
): string {
  principal = principal / 100;
  monthlyPayment = monthlyPayment / 100;
  // Monthly interest rate
  const monthlyInterestRate = annualInterestRate / 1200;
  // Check if the monthly payment is enough to cover the interest
  if (monthlyPayment <= principal * monthlyInterestRate) {
    throw new Error("Monthly payment is too low to cover interest. Loan will never be repaid.");
  }

  // Number of months to repay the loan
  const numberOfMonths =
    Math.log(1 - (principal * monthlyInterestRate) / monthlyPayment) / Math.log(1 + monthlyInterestRate);

  // Convert months to years
  const loanTermYears = Math.abs(numberOfMonths) / 12;

  return calculateEndDate(startDate, loanTermYears);
}

// calculate two dates period
export function calculateYearsBetweenDates(startDateStr: string, endDateStr: string): number {
  if (!startDateStr || !endDateStr) {
    return 0;
  }
  // Parse the date strings into Date objects
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Calculate the difference in years
  let yearsDifference = endDate.getFullYear() - startDate.getFullYear();

  if (
    endDate.getMonth() < startDate.getMonth() ||
    (endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate())
  ) {
    yearsDifference--;
  }

  return yearsDifference;
}
