import { Typography, Card, Box } from "@mui/material";

import { Colors } from "style/color";
import { camelCaseToTitleCase } from "utils/helper";
import { formatDateToTimezone } from "utils/dateTimeHelper";
import { convertToCurrencyUnit } from "utils/currencyHelper";
import StyledBox from "component/muiComponent/flexBox";
import { useAppSelector } from "store/hooks";

interface LoanSummary {
  fixedRate: number;
  startDate: string;
  endDate: string;
  rateType: string;
  loanAmount?: number;
  maturityDate: string;
  repaymentAmount?: number;
}

interface IPropsLoan {
  loan: LoanSummary;
  title: string;
  isNew: boolean;
}

const RepaymentCard = ({ loan, title, isNew }: IPropsLoan) => {
  const symbol = useAppSelector((state) => state.client.currencySymbol);
  const direction = useAppSelector((state) => state.client.currencyDirection);

  function formatValue(key: string, value: string | number) {
    if (key.includes("Date") && typeof value === "string") {
      return formatDateToTimezone(value);
    }
    if (key === "fixedRate") {
      return `${value}%`;
    }
    if (key === "period") {
      return `${value} Year${Number(value) > 1 ? `s` : ``}`;
    }
    if (typeof value === "number") {
      return convertToCurrencyUnit(value, symbol, direction);
    }
    return value;
  }

  function checkIfChange(key: string) {
    return ["maturityDate", "repaymentAmount"].includes(key) && isNew;
  }

  return (
    <Box flexGrow={1}>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
          width: "inherit",
        }}
      >
        <Box
          sx={{
            bgcolor: Colors.DarkBlue,
            color: Colors.White,
            width: "100%",
            padding: "10px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            {title} Loan
          </Typography>
        </Box>
        {Object.entries(loan).map(([key, value], index) => {
          return (
            <StyledBox
              key={index}
              sx={{
                width: "100%",
                padding: "8px 16px",
                boxSizing: "border-box",
              }}
            >
              <Typography color="textSecondary">
                <strong>{camelCaseToTitleCase(key)}</strong>
              </Typography>
              {checkIfChange(key) ? (
                <Typography color="warning">
                  <strong>{formatValue(key, value)}</strong>
                </Typography>
              ) : (
                <Typography color="textPrimary">
                  {formatValue(key, value)}
                </Typography>
              )}
            </StyledBox>
          );
        })}
      </Card>
    </Box>
  );
};

export default RepaymentCard;
