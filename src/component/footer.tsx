import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";

import { Colors } from "style/color";

import { useCurrentTime } from "utils/dateTimeHelper";

interface ContactInfo {
  country: string;
  phoneLocal: string;
}

const contactInfo: ContactInfo = {
  country: "New Zealand",
  phoneLocal: "0800 269 296",
};

const Footer: React.FC = () => {
  const { currentTime } = useCurrentTime();
  return (
    <Grid
      container
      sx={{
        p: "20px 40px",
        height: "fit-content",
        width: "100%",
        color: Colors.White,
        bgcolor: Colors.MainBlue,
        mt: 7,
      }}
    >
      <Grid size={12}>
        <Typography variant="h4" fontWeight="bold">
          HOW WE CAN HELP?
        </Typography>
      </Grid>

      <Grid size={12} margin={"10px 0"}>
        <Typography>If you have any questions, our team is available for help.</Typography>
      </Grid>

      <Grid size={12} margin={"10px 0 0"}>
        <Typography variant="h4">Contact Information</Typography>
      </Grid>
      <Grid container size={12}>
        <Grid size={6} margin={"8px 0 18px"} display={"flex"}>
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography>{contactInfo.phoneLocal}</Typography>
        </Grid>
        <Grid size={6} display={"flex"} justifyContent={"flex-end"}>
          <AccessTimeSharpIcon sx={{ mr: 1 }} />
          <Typography sx={{ textAlign: "right" }}>{currentTime}</Typography>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Typography sx={{ fontSize: "0.7em" }}>Copyright © 2024 Lin's Company</Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
