import { Fragment, useMemo } from "react";
import Navigation from "component/styledLink";

import { formatDateToTimezone, checkIfExpiry } from "utils/dateTimeHelper";
import { convertToCurrencyUnit } from "utils/currencyHelper";

import {
  Tooltip,
  Box,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  Typography,
  Link,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { Account } from "types";
import { Colors } from "style/color";

import StyledBox from "component/muiComponent/flexBox";
import { useAppSelector } from "store";

interface IProps {
  account: Account;
  hideRedirect?: boolean;
  hideWarning?: boolean;
}

export function AccountCard({ account, hideRedirect = false, hideWarning = false }: IProps) {
  const { currencySymbol: symbol, currencyDirection: direction } = useAppSelector((store) => store.client);

  const accountDetail = useMemo(
    () => `${account.loanType} at ${account.interestRate}%
    p.a. until ${formatDateToTimezone(account.maturityDate)}`,
    [account.loanType, account.interestRate, account.maturityDate],
  );
  const isExpiry = checkIfExpiry(account?.effectiveDateEnd);

  return (
    <ListItem alignItems="center">
      <ListItemAvatar sx={{ marginRight: 2 }}>
        <Avatar alt={account.accountName} />
      </ListItemAvatar>

      <StyledBox
        sx={{
          alignItems: "flex-start",
          flexDirection: "column",
          margin: "0 auto 0 0",
        }}
      >
        <ListItemText
          primary={
            <Typography color={"textSecondary"} variant="h4">
              {account.accountName}
            </Typography>
          }
        />
        <Typography variant="body1">
          <span>{account.accountNumber}</span> | <span>{accountDetail}</span>
        </Typography>
        <Typography sx={{ mt: 1.5 }}>Next repayment {formatDateToTimezone(account.nextPaymentDate)}</Typography>
        {!hideRedirect && (
          <Link href={`/account/${account.accountId}`}>
            <Typography sx={{ color: "text.secondary" }}>View more details</Typography>
          </Link>
        )}
      </StyledBox>

      <Box>
        {isExpiry && (
          <Navigation path={`/account/${account.accountId}/refix`}>
            {!hideWarning && (
              <StyledBox sx={{ color: Colors.Red }}>
                <Typography>Refix rates now</Typography>
                <Tooltip
                  title={`Your previous home loan will expire on ${formatDateToTimezone(
                    account.effectiveDateEnd,
                  )}, please refix new rates before that date.`}
                  arrow
                >
                  <InfoIcon sx={{ color: Colors.Red, ml: 1 }} />
                </Tooltip>
              </StyledBox>
            )}
          </Navigation>
        )}
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: "bold", mt: 1, textAlign: "right" }}>
              {convertToCurrencyUnit(account.loanAmount, symbol, direction)}
            </Typography>
          }
        />
      </Box>
    </ListItem>
  );
}

export default function AccountList({ accounts }: { accounts: Account[] }) {
  return (
    <List>
      {accounts.map((account: Account) => {
        return (
          <Fragment key={account.accountId}>
            <AccountCard account={account} />
            <Divider variant="fullWidth" />
          </Fragment>
        );
      })}
    </List>
  );
}
