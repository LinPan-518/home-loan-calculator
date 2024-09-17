import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

import { Account, Transaction } from "types";

import AccountDetails from "./component/accountDetailsCard";
import TransactionTable from "./component/transactionTable";
import fetchJSON from "utils/fetchJson";
import Skeleton from "./component/skeleton";
import AccountSummary from "./component/accountSummary";

interface LoanDetailsParams {
  accountId: string;
}

const LoanDetails: React.FC = () => {
  const { accountId } = useParams<LoanDetailsParams>();
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadData = async () => {
      try {
        const [transactionsData, accountsData] = await Promise.all([
          fetchJSON(`${process.env.PUBLIC_URL}/api/transaction.json`),
          fetchJSON(`${process.env.PUBLIC_URL}/api/account.json`),
        ]);

        setTransaction(transactionsData?.data || []);
        setData(accountsData?.data);
      } catch (error) {
        if (signal.aborted) return;
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      controller.abort();
    };
  }, []);

  const account = data.find((acc) => acc.accountId === accountId);

  if (loading) return <Skeleton />;

  return (
    <>
      {account && <AccountSummary account={account} />}
      <Container sx={{ mt: 4 }}>
        {account && <AccountDetails account={account} />}
        <TransactionTable
          transaction={transaction.filter((t) => t.accountId === accountId)}
          accountRemaining={account?.remainingBalance || 0}
        />
      </Container>
    </>
  );
};

export default LoanDetails;
