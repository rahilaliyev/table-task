import { useState } from "react";
import { AppBar, Avatar, Badge, Box, Button, IconButton, Stack, SvgIcon, Toolbar, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ReactComponent as NotificationIcon } from "assets/notification.svg";
import { ReactComponent as Logo } from "assets/LogoMain.svg";
import ProfilePicture from "assets/profile.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Navbar = () => {
  const DRAWER_WIDTH = 120;
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;
  const theme = useTheme();
  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    backgroundColor: theme.palette.primary.white,
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    },
  }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up("lg")]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }} sx={{ color: "black" }}>
          <Button
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{ color: "black" }}
          >
            <IconButton sx={{ border: `1px solid ${theme.palette.primary.neutral400}`, borderRadius: "16px", marginRight: "8px" }}>
              <SvgIcon>
                <Logo />
              </SvgIcon>
            </IconButton>{" "}
            <Typography component={"span"} sx={{ textTransform: "capitalize", color: theme.palette.primary.neutral850 }}>
              Pasha Həyat Sığorta
            </Typography>
          </Button>
          <IconButton>
            <Badge color="secondary">
              <SvgIcon>
                <NotificationIcon />
              </SvgIcon>
            </Badge>
          </IconButton>{" "}
          <Avatar alt="Profile" src={ProfilePicture} />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default Navbar;
