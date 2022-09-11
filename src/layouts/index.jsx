import { Box, Stack } from "@mui/material";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

const Layout = ({ children }) => {
  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Box display={"flex"} flexDirection={"column"} sx={{ width: "90%" }} pt={9} ml={12}>
        <Navbar />
        {children}
      </Box>
    </Stack>
  );
};

export default Layout;
