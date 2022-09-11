import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Loading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} my={5}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
