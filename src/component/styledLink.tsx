import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Colors } from "style/color";
import { Link } from "@mui/material";

const Navigation = ({ children, path }: { children: React.ReactNode; path: string }) => {
  return (
    <Link
      component={RouterLink}
      to={path}
      underline="none"
      sx={{
        textDecoration: "none",
        color: Colors.Blue,
        fontWeight: "bold",
        "&:hover": {
          color: Colors.DarkBlue,
        },
      }}
    >
      {children}
    </Link>
  );
};

export default Navigation;
