import { Box, IconButton, Modal, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SuccessImage from "assets/success.png";

const SuccessModal = ({ successModal, handleCloseSuccessModal }) => {
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    height: "50vh",
    background: "#FFFFFF",
    boxShadow: "0px 4px 55px rgba(0, 0, 0, 0.07)",
    borderRadius: "12px",
    p: 3,
  };

  return (
    <Modal
      hideBackdrop
      open={successModal}
      onClose={handleCloseSuccessModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton size="large" onClick={handleCloseSuccessModal} sx={{ position: "absolute", top: "31px", right: "28px" }}>
          <CloseIcon />
        </IconButton>
        <Typography sx={{ color: theme.palette.primary.main }} variant="h5" component="h5">
          Uğurlu əməliyyat
        </Typography>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} mt={5}>
          <Box component="img" alt="success" src={SuccessImage} />
          <Typography component={"h6"} variant={"h6"} mt={5}>
            Qaimə əməliyyatınız uğurla tamamlanmışdır!
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
