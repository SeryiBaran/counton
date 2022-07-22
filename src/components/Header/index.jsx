import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
} from "@mui/material";
import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
} from "@mui/icons-material";

import { navigateToWallet } from "@/utils";

export const Header = () => {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              component={RouterLink}
              sx={{ mr: 2 }}
              to="/"
            >
              <AccountBalanceWalletIcon />
            </IconButton>
            <Box
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            ></Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
