import { AppBar, Box, Link, List, ListItem, ListItemIcon, SvgIcon, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Logo from "assets/Logo.png";
import { ReactComponent as DashboardSvg } from "assets/dashboardIcon.svg";
import { ReactComponent as GridSvg } from "assets/grid.svg";
import { ReactComponent as CalculatorSvg } from "assets/calculator.svg";
import { ReactComponent as TableSvg } from "assets/table.svg";
import { ReactComponent as PhoneSvg } from "assets/phoneIcon.svg";
import { ReactComponent as GraphikIcon } from "assets/graphikIcon.svg";
import { ReactComponent as PieIcon } from "assets/pieIcon.svg";
import { ReactComponent as ProtectedIcon } from "assets/protectIcon.svg";
import { ReactComponent as BagIcon } from "assets/bagIcon.svg";
import { ReactComponent as GovernmentIcon } from "assets/governmentIcon.svg";

const Sidebar = () => {
  const theme = useTheme();

  const icons = [
    { item: <DashboardSvg />, selected: false },
    { item: <GridSvg />, selected: false },
    { item: <CalculatorSvg />, selected: false },
    { item: <TableSvg />, selected: true },
    { item: <PhoneSvg />, selected: false },
    { item: <GraphikIcon />, selected: false },
    { item: <PieIcon />, selected: false },
    { item: <ProtectedIcon />, selected: false },
    { item: <BagIcon />, selected: false },
    { item: <GovernmentIcon />, selected: false },
  ];
  return (
    <Box
      sx={{ backgroundColor: theme.palette.primary.main, borderRadius: "16px", position: "fixed", zIndex: 1111 }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      pt={3.4}
    >
      <AppBar position="static" sx={{ borderRadius: "16px", boxShadow: "none" }}>
        <Toolbar>
          <Link href="/">
            <Box component="img" sx={{ height: 40, width: 40 }} alt="Logo" src={Logo} />
          </Link>
        </Toolbar>
      </AppBar>

      <List
        sx={{
          height: "85vh",
          "&& .Mui-selected, && .Mui-selected:hover": {
            bgcolor: "white",
            "&, & .MuiListItemIcon-root": {
              color: "white",
            },
          },
        }}
      >
        {icons.map((icon, key) => (
          <ListItem button key={key} selected={icon.selected} sx={{ width: 58, height: 58, borderRadius: "16px" }}>
            <ListItemIcon>
              <SvgIcon color={theme.palette.primary.white}>{icon.item}</SvgIcon>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
