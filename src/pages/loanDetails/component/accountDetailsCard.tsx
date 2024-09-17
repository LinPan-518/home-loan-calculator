import { Fragment } from "react";
import { Typography, Box, styled } from "@mui/material";

import { Account } from "types";
import { formatDateToTimezone } from "utils/dateTimeHelper";
import { convertToCurrencyUnit } from "utils/currencyHelper";
import { camelCaseToTitleCase } from "utils/helper";
import { useAppSelector } from "store";

import { Colors } from "style/color";

const GridBox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: "10px 20px",
  padding: "10px",
  border: `1px solid ${Colors.Grey}`,
  borderRadius: "5px",
  marginBottom: "24px",
});

type FieldTypes = { [key: string]: "shortDate" | "number" | "string" };

const accountSummary: FieldTypes = {
  accountName: "string",
  accountNumber: "string",
  effectiveDate: "shortDate",
  effectiveDateEnd: "shortDate",
  maturityDate: "shortDate",
  nextPaymentDate: "shortDate",
  lastPaymentDate: "shortDate",
  nextPaymentAmount: "number",
};

const AccountDetails = ({ account }: { account: Account }) => {
  const symbol = useAppSelector((state) => state.client.currencySymbol);
  const direction = useAppSelector((state) => state.client.currencyDirection);

  const formatValue = (key: string, value: any) => {
    const type = accountSummary[key];
    if (type === "shortDate") {
      return formatDateToTimezone(value);
    } else if (type === "number") {
      return convertToCurrencyUnit(value, symbol, direction);
    } else if (type === "string") {
      return value;
    }
    return value;
  };

  return (
    <>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Account Summary
      </Typography>

      <GridBox>
        {Object.entries(account).map(([key, value], index) => {
          if (accountSummary[key]) {
            return (
              <Fragment key={key}>
                <Typography variant="body1" color="textSecondary">
                  {camelCaseToTitleCase(key)}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {formatValue(key, value)}
                </Typography>
              </Fragment>
            );
          } else return null;
        })}
      </GridBox>
    </>
  );
};

export default AccountDetails;
