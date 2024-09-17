import React from "react";
import { Typography, Divider, Box } from "@mui/material";

const StepContainer = ({ children, stepName }: { children?: React.ReactNode; stepName: string }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {children}
        <Typography variant="h5">{stepName}</Typography>
      </Box>
      <Divider variant="fullWidth" sx={{ mb: 3, mt: 2 }} />
    </>
  );
};

export default StepContainer;
