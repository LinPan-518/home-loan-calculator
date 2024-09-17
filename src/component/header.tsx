import {
  styled,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

import { ClientData } from "types";

const StyledBox = styled(Box)({
  display: "flex",
  gap: "16px",
  alignItems: "center",
});

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0px 40px",
});

interface IProps {
  client: ClientData;
}

const Header = ({ client }: IProps) => {
  return (
    <AppBar position="sticky">
      <StyledToolBar disableGutters>
        <StyledBox>
          <AdbIcon />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: "bold",
              display: { xs: "none", sm: "block" },
            }}
          >
            Bank Name
          </Typography>
        </StyledBox>

        <StyledBox>
          <Avatar src={client?.avatar} alt={`${client?.clientName}'s avatar`} />
          <Typography variant="h6" noWrap sx={{ fontWeight: 500 }}>
            {client?.clientName}
          </Typography>
        </StyledBox>
      </StyledToolBar>
    </AppBar>
  );
};

export default Header;
