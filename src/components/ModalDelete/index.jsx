import { Box, Button, ButtonGroup, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "helpers/axiosInstance";
import { useState } from "react";
import Loading from "components/Loading";

const ModalDelete = ({ deleteModal, handleCloseModal, id, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 680,
    bgcolor: "white",
    borderRadius: "16px",
    boxShadow: "0px 4px 55px rgba(0, 0, 0, 0.07)",
    p: "70px 0",
    textAlign: "center",
  };

  const handleDelete = () => {
    setLoading(true);
    axiosInstance
      .delete(`/rows/${id}`)
      .then(() => {
        handleCloseModal();
        refreshData();
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  return (
    <Modal
      sx={{
        "& .MuiBackdrop-root ": {
          background: "rgba(0,0,0, 0.04)",
        },
      }}
      open={deleteModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {loading ? (
        <Loading />
      ) : (
        <Box sx={style}>
          <IconButton size="small" onClick={handleCloseModal} sx={{ position: "absolute", top: "28px", right: "28px" }}>
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h5" component="h5" marginBottom={5}>
            Qaiməni silməyinizə əminsiniz?
          </Typography>
          <ButtonGroup>
            <Button onClick={handleCloseModal} sx={{ borderRadius: "8px !important", marginRight: "14px", borderRightColor: "#266AEB !important" }}>
              İmtina
            </Button>
            <Button onClick={handleDelete} variant="contained" sx={{ borderRadius: "8px !important" }}>
              Sil
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Modal>
  );
};

export default ModalDelete;
