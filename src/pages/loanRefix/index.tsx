import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Divider } from "@mui/material";

import { Rate, Account } from "types";

import AccountSummary from "pages/loanDetails/component/accountSummary";
import fetchJSON from "utils/fetchJson";
import FixedRateSelection from "./component/ratesSelection";
import ReviewSelection from "./component/repaymentReview";
import { LoanSummary } from "./component/repaymentReview";
import Loading from "./component/skeleton";

interface LoanDetailsParams {
  accountId: string;
}

export enum Step {
  step1 = 1,
  step2 = 2,
}

const LoanDetails: React.FC = () => {
  const history = useHistory();
  const { accountId } = useParams<LoanDetailsParams>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rateOptions, setRateOptions] = useState<Rate[]>([]);
  const [step, setStep] = useState(Step.step1);
  const [account, setAccount] = useState<Account>();
  const [form, setForm] = useState({});
  const [scrollToStep2, setScrollToStep2] = useState(false);

  const handleSubmit = (currentRapayment: LoanSummary) => {
    alert("Save data successfully!");
    history.push("/");
    //send rate id to BE, upgrade account info
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const [ratesData, accountsData] = await Promise.all([
          fetchJSON(`${process.env.PUBLIC_URL}/api/fixed_rates.json`),
          fetchJSON(`${process.env.PUBLIC_URL}/api/account.json`),
        ]);

        setRateOptions(ratesData?.data || []);
        const targetAccount = accountsData?.data?.find(
          (acc: Account) => acc.accountId === accountId,
        );
        setAccount(targetAccount);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [accountId]);

  const handleNextStep = (rateId: string) => {
    setStep(2);
    setForm({ ...form, rateId: rateId });
    setScrollToStep2(true);
  };

  // Effect to handle scrolling to step 2
  useEffect(() => {
    if (scrollToStep2) {
      const nextElement = document.getElementById("step2");
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setScrollToStep2(false);
    }
  }, [scrollToStep2]);

  if (loading) return <Loading />;
  if (error) return <div>error...</div>;
  return (
    <>
      {account && <AccountSummary account={account} />}
      {step >= Step.step1 && (
        <FixedRateSelection
          data={rateOptions}
          step={step}
          handleNextStep={(rateId) => handleNextStep(rateId)}
        />
      )}
      {step === Step.step2 && (
        <div id={"step2"}>
          <Divider variant="fullWidth" sx={{ marginBottom: "20px" }} />
          <ReviewSelection
            handleSubmit={handleSubmit}
            handlePreviousStep={() => setStep(step - 1)}
            account={account}
            rateOptions={rateOptions}
            formValue={form}
          />
        </div>
      )}
    </>
  );
};

export default LoanDetails;
