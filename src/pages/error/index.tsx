import React from "react";
import { RedirectProps } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import { Colors } from "style/color";
import barrier from "statics/image/images-barrier-1.svg";
import barrier2 from "statics/image/images-barrier-2.svg";
import cone from "statics/image/error.svg";

import Navigation from "component/styledLink";
import StyledBox from "component/muiComponent/flexBox";

interface IErrorInfo {
  title: string;
  message: React.ReactNode;
  image: string;
  hasUniqLink?: boolean;
  uniqLink?: string | React.ReactNode;
}

const errorPageInfo: Record<string, IErrorInfo> = {
  _403: {
    title: "No Access",
    message: (
      <span>
        Unfortunately, you do not have access to this page. <br />
        Please contact your account administrator to get access.
      </span>
    ),
    image: barrier2,
  },
  _401: {
    title: "No Access",
    message: (
      <span>
        Unfortunately, you do not have access to this page. <br />
        Please contact your account administrator to get access.
      </span>
    ),
    image: barrier2,
  },
  _401NoAcc: {
    title: "No Accounts",
    message: (
      <span>
        Unfortunately, you have not been added to any accounts. <br />
        Please contact your account administrator to get access. <br /> <br /> You can try logging in with a different
        account.
      </span>
    ),
    image: barrier2,
    hasUniqLink: true,
    uniqLink: (
      <Button
        onClick={() => {
          window.location.href = "/logout";
        }}
        title="Login Again"
      />
    ),
  },
  _403LinkExpired: {
    title: "Link Expired",
    message: (
      <span>
        Unfortunately, the link you opened has expired. <br />
        Please contact your account administrator to get a new link.
      </span>
    ),
    image: barrier,
  },
  _404: {
    title: "Page Not Found",
    message: "Unfortunately, we couldn't find the page you're looking for.",
    image: cone,
  },
  _errorBoundary: {
    title: "Something Wrong",
    message: (
      <>
        Uh Oh! Something has gone wrong.
        <br />
        <br />
        You can refresh the page or report this error if the issue persists.
      </>
    ),
    image: cone,
    hasUniqLink: true,
  },
};

interface IProps {
  errorType: string;
  children?: React.ReactNode;
  props?: RedirectProps;
}

const ErrorPage: React.FC<IProps> = ({ errorType, children }) => {
  const data = errorPageInfo[errorType];
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          bgcolor: Colors.Orange,
          height: "100px",
          boxShadow: " 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        }}
      />
      <StyledBox
        sx={{
          justifyContent: "center",
          p: 7,
          flexDirection: "column",
          mt: 4,
        }}
      >
        <Typography variant="h1" sx={{ color: Colors.Orange, mb: 4 }}>
          {data.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.message}
        </Typography>
        <Box component="img" src={data.image} sx={{ width: "360px", height: "360px" }} />
        {data.hasUniqLink && <>{data.uniqLink}</>}
        {!data.hasUniqLink && (
          <Navigation path="/">
            <Button variant="contained" color="primary" sx={{ mt: 5 }}>
              Back to Home
            </Button>
          </Navigation>
        )}
        {children}
      </StyledBox>
    </Box>
  );
};

export const Error401NoAcc = () => <ErrorPage errorType="_401NoAcc" />;
export const Error403 = () => <ErrorPage errorType="_403LinkExpired" />;
export const Error403AccessDenied = () => <ErrorPage errorType="_403" />;
export const Error401 = () => <ErrorPage errorType="_401" />;
export const Error404 = () => <ErrorPage errorType="_404" />;
export const ErrorBoundaryPage: React.FC<IProps> = (props) => (
  <ErrorPage errorType={"_errorBoundary"}>{props.children}</ErrorPage>
);
