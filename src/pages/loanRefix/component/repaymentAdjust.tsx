import React, { useEffect } from "react";
import numeral from "numeral";

import Grid from "@mui/material/Grid2";
import { Typography, Slider, OutlinedInput, InputLabel, InputAdornment, FormControl, Paper } from "@mui/material";
import StepHeader from "./stepHeader";
import { useAppSelector } from "store";

interface IProps {
  minimalValue: number | undefined;
  maximumValue: number | undefined;
  handleNewRepayment: (repay: number | undefined) => void;
}
type InputType = number | string;

export default function InputSlider({ minimalValue, maximumValue, handleNewRepayment }: IProps) {
  const [value, setValue] = React.useState<InputType>(0);
  const { currencySymbol } = useAppSelector((state) => state.client);

  useEffect(() => {
    setValue(minimalValue ?? 0);
  }, [minimalValue]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    handleBlur(numeral(newValue).format("0.00"));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleBlur = (newValue: string | number) => {
    let properValue = newValue;
    if (typeof properValue === "string") {
      properValue = parseFloat(properValue);
    }
    if (minimalValue !== undefined && properValue < minimalValue) {
      properValue = minimalValue;
    }
    if (maximumValue !== undefined && properValue > maximumValue) {
      properValue = maximumValue;
    }
    setValue(properValue);
    handleNewRepayment(properValue);
  };

  return (
    <Grid marginTop={"20px"}>
      <StepHeader stepName="(Optional) Adjust your repayment" />
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
          padding: 2,
          width: { xs: "100%", sm: "50%" },
          margin: "auto",
        }}
      >
        <Typography id="input-slider" gutterBottom>
          By changing your monthly minimum repayments to:
        </Typography>
        <Slider
          value={typeof value === "number" ? value : parseFloat(value)}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          max={maximumValue}
          min={minimalValue}
          sx={{ width: "60%" }}
        />
        <FormControl sx={{ m: 1, width: "60%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Repayment Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">{currencySymbol}</InputAdornment>}
            label="Repayment Amount"
            onChange={handleInputChange}
            value={value}
            onBlur={() => handleBlur(value)}
          />
        </FormControl>
      </Paper>
    </Grid>
  );
}
