import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Divider } from "@mui/material";

import { Account } from "types";

import AccountSummary from "pages/loanDetails/component/accountSummary";
import FixedRateSelection from "./component/ratesSelection";
import ReviewSelection from "./component/repaymentReview";
import { LoanSummary } from "./component/repaymentReview";
import Loading from "./component/skeleton";

import { useAppDispatch, useAppSelector } from "store";
import { getAccountsAsync, getRatesAsync } from "store/reducer/account";
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
  const dispatch = useAppDispatch();
  const { rateOptions, loading, accounts, error } = useAppSelector((store) => store.accounts);

  const [step, setStep] = useState(Step.step1);
  const [form, setForm] = useState({});
  const [scrollToStep2, setScrollToStep2] = useState(false);

  useEffect(() => {
    dispatch(getRatesAsync());
    dispatch(getAccountsAsync());
  }, [accountId]);

  const handleSubmit = (currentRapayment: LoanSummary) => {
    alert("Save data successfully!");
    history.push("/");
    //send rate id to BE, upgrade account info
  };

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

  const account = accounts.find((acc) => acc.accountId === accountId) || ({} as Account);

  if (loading) return <Loading />;
  if (error) return <div>error...</div>;

  return (
    <>
      <AccountSummary account={account} />
      {step >= Step.step1 && (
        <FixedRateSelection data={rateOptions} step={step} handleNextStep={(rateId) => handleNextStep(rateId)} />
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
