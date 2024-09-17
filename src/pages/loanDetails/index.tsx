import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

import AccountDetails from "./component/accountDetailsCard";
import TransactionTable from "./component/transactionTable";
import Skeleton from "./component/skeleton";
import AccountSummary from "./component/accountSummary";
import { useAppDispatch, useAppSelector } from "store";
import { getTransactionsAsync } from "store/reducer/transaction";
import { getAccountsAsync } from "store/reducer/account";
import { Account } from "types";
interface LoanDetailsParams {
  accountId: string;
}

const LoanDetails: React.FC = () => {
  const { accountId } = useParams<LoanDetailsParams>();
  const dispatch = useAppDispatch();
  const { transactions: transaction, loading } = useAppSelector((store) => store.transactions);
  const { accounts: data, loading: accLoading } = useAppSelector((store) => store.accounts);

  useEffect(() => {
    dispatch(getTransactionsAsync());
    dispatch(getAccountsAsync());
  }, []);

  const account = data.find((acc) => acc.accountId === accountId) || ({} as Account);

  if (loading || accLoading) return <Skeleton />;

  return (
    <>
      <AccountSummary account={account} />
      <Container sx={{ mt: 4 }}>
        <AccountDetails account={account} />
        <TransactionTable
          transaction={transaction.filter((t) => t.accountId === accountId)}
          accountRemaining={account?.remainingBalance ?? 0}
        />
      </Container>
    </>
  );
};

export default LoanDetails;
