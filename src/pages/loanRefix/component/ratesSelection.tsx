import { useMemo, useState } from "react";

import { Rate } from "types";

import { Typography, Radio, Box, Button, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import StepContainer from "./stepHeader";
import { Step } from "../index";
import { Colors } from "style/color";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";

const StyledBox = styled(Grid)(({ theme }) => ({
  width: "30%",
  border: `1px solid rgba(0, 0, 0, 0.12)`,
  borderRadius: "8px",
  height: "100px",
  padding: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  "&:hover": {
    borderColor: Colors.DarkBlue,
    transform: "scale(1.05)",
    transition: "transform 0.3s ease-in-out",
    color: Colors.DarkBlue,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const FixedRateSelection = ({
  data,
  handleNextStep,
  step,
}: {
  data: Rate[];
  handleNextStep: (rateId: string) => void;
  step: Step;
}) => {
  const [selectedRateId, setSelectedRateId] = useState("");
  const isDisabled = useMemo(() => {
    return step !== 1;
  }, [step]);

  const handleRadioChange = (rateId: string) => {
    setSelectedRateId(rateId);
  };

  return (
    <Box sx={{ padding: "40px", boxSizing: "border-box" }}>
      <StepContainer stepName="Choose a new fixed rate for your home loan">
        <LooksOneOutlinedIcon />
      </StepContainer>
      <Grid container spacing={2} justifyContent="flex-start">
        {data.map((rate) => (
          <StyledBox
            sx={{
              pointerEvents: isDisabled ? "none" : "auto",
              opacity: isDisabled && selectedRateId !== rate.rateId ? 0.5 : 1,
              cursor: isDisabled ? "not-allowed" : "default",
              ...(selectedRateId === rate.rateId ? { borderColor: Colors.DarkBlue, color: Colors.DarkBlue } : {}),
            }}
            key={rate.rateId}
            onClick={() => {
              if (isDisabled) {
                return;
              }
              return handleRadioChange(rate.rateId);
            }}
          >
            <Radio checked={selectedRateId === rate.rateId} disabled={isDisabled} />
            <Box sx={{ ml: 1 }}>
              <Typography>
                {Number.isInteger(rate.period)
                  ? `${rate.period} ${rate.period === 1 ? "Year" : "Years"}`
                  : `${Math.round(rate.period * 12)} Months`}
              </Typography>
              <Typography variant="h3">
                {rate.fixedRate}% <span style={{ fontSize: "0.75em" }}>p.a.</span>
              </Typography>
            </Box>
          </StyledBox>
        ))}
      </Grid>

      {!isDisabled && (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedRateId}
            onClick={() => handleNextStep(selectedRateId)}
          >
            Next Step
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FixedRateSelection;
