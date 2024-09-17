export const Currency: CurrencyType = {
  AUD: {
    symbol: "$",
    value: "Australian Dollars",
    direction: "LTR",
  },
  NZD: {
    symbol: "$",
    value: "New Zealand Dollars",
    direction: "LTR",
  },
  GBP: {
    symbol: "£",
    value: "Pound Sterling",
    direction: "LTR",
  },
};

export type DirectionType = "LTR" | "RTL";
export interface CurrencyDetails {
  symbol: string;
  value: string;
  direction: DirectionType;
}

// Define the type for the Currency object
export type CurrencyType = {
  [key: string]: CurrencyDetails;
};
