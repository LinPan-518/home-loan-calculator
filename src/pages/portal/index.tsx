import { useEffect, useState, useMemo } from "react";
import { Redirect } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import { Colors } from "style/color";
import StyledBox from "component/muiComponent/flexBox";
import AccountList from "./component/accountCard";
import Skeleton from "./component/skeleton";
import fetchJSON from "utils/fetchJson";
import { convertToCurrencyUnit } from "utils/currencyHelper";
import { useAppSelector } from "store/hooks";
import { Account } from "types";

const Home = () => {
  const [data, setData] = useState<Account[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const symbol = useAppSelector((store) => store.client.currencySymbol);
  const direction = useAppSelector((store) => store.client.currencyDirection);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const accountResult = await fetchJSON(
          `${process.env.PUBLIC_URL}/api/account.json`,
        );
        setData(accountResult?.data || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const loanTotalValue = useMemo(() => {
    return data.reduce((sum, acc) => sum + acc.loanAmount, 0);
  }, [data]);

  if (isLoading) return <Skeleton />;
  if (error) return <Redirect to={"/not-found"} />;

  return (
    <>
      <Box sx={{ padding: "20px", flexGrow: 1 }}>
        <Typography variant="h1">Your Accounts</Typography>
        <Accordion
          defaultExpanded
          sx={{
            padding: "30px",
            margin: "40px 0 !important",
            minWidth: "640px",
          }}
        >
          <AccordionSummary
            id="panel1-header"
            expandIcon={<ExpandMoreIcon sx={{ margin: "0px 8px" }} />}
            aria-controls="panel1-content"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StyledBox
              sx={{
                alignItems: "center",
                gap: 2,
              }}
            >
              <HomeOutlinedIcon
                fontSize={"large"}
                sx={{
                  color: Colors.Blue,
                  borderRadius: "50%",
                  border: `2px solid ${Colors.Grey}`,
                  padding: 2,
                  mr: 1,
                  boxSizing: "content-box",
                }}
              />
              <Box>
                <Typography color={"textSecondary"} variant="h4">
                  Your Home Loans
                </Typography>
                <Typography>{data.length} home loans</Typography>
              </Box>
            </StyledBox>
            <StyledBox
              sx={{
                flexDirection: "column",
                margin: "0 0 0 auto",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Typography>
                <strong>Total of current home loans</strong>
              </Typography>
              <Typography>
                <strong>
                  {convertToCurrencyUnit(loanTotalValue, symbol, direction)}
                </strong>
              </Typography>
            </StyledBox>
          </AccordionSummary>

          <AccordionDetails>
            <Divider variant="fullWidth" />
            <AccountList accounts={data} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Home;
