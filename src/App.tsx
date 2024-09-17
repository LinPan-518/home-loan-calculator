import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { styled, Box, CssBaseline } from "@mui/material";
import { GlobalStyle } from "style/globalStyle";

import Header from "component/header";
import Footer from "component/footer";

import ErrorBoundary from "pages/error/errorBoundry";
import Portal from "pages/portal";
import { Error404, Error401NoAcc, Error403AccessDenied } from "pages/error";

import { getClientAsync } from "store/reducer/client";
import { useAppSelector, useAppDispatch } from "store";

const LoanDetails = lazy(() => import("pages/loanDetails"));
const LoanCalculation = lazy(() => import("pages/loanRefix"));

const MainBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  maxWidth: "1440px",
  margin: "0px auto",
});

function App() {
  const dispatch = useAppDispatch();
  const client = useAppSelector((state) => state.client.client);
  const error = useAppSelector((state) => state.client.error);

  useEffect(() => {
    dispatch(getClientAsync());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;
  return (
    <MainBox>
      <CssBaseline />
      <GlobalStyle />
      <ErrorBoundary>
        <Header client={client} />
        <Router>
          <Suspense fallback={<></>}>
            <Switch>
              <Route path="/error_401_no_accounts" exact render={() => <Error401NoAcc />} />
              <Route path="/access-denied" exact render={() => <Error403AccessDenied />} />
              <Route path="/account/:accountId/refix" component={LoanCalculation} />
              <Route path="/account/:accountId" component={LoanDetails} />
              <Route exact path="/" component={Portal} />
              <Route path="*" component={Error404} />
            </Switch>
          </Suspense>
        </Router>
        <Footer />
      </ErrorBoundary>
    </MainBox>
  );
}

export default App;
