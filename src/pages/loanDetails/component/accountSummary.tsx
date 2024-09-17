import { Box, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Colors } from "style/color";

import { Account } from "types";
import cover from "statics/image/faded_gallery-OfdOEdGYiuk-unsplash.jpg";

import StyledBox from "component/muiComponent/flexBox";
import StyledLink from "component/styledLink";
import { AccountCard } from "pages/portal/component/accountCard";

const Head = ({ account }: { account: Account }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "240px",
        position: "relative",
      }}
    >
      <StyledBox
        sx={{
          bgcolor: "white",
          width: "70%",
          minWidth: "500px",
          borderRadius: "4px",
          margin: "40px auto",
        }}
      >
        <AccountCard account={account} hideRedirect={true} />
      </StyledBox>
      <StyledLink path={"/"}>
        <StyledBox
          sx={{
            width: "max-content",
            gap: "10px",
            position: "absolute",
            right: "40px",
          }}
        >
          <HomeOutlinedIcon sx={{ color: Colors.White }} />
          <Typography component={"span"} sx={{ color: Colors.White }}>
            Back To Home
          </Typography>
        </StyledBox>
      </StyledLink>
    </Box>
  );
};

export default Head;
