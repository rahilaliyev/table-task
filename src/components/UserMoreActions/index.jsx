import { Button, ButtonGroup, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import axiosInstance from "helpers/axiosInstance";
import ModalDelete from "components/ModalDelete";
import Edit from "components/Edit";

const UserMoreActions = ({ id, refreshData, rows, allData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [status, setStatus] = useState(null);

  const openStatus = Boolean(status);
  const handleClickStatus = (e) => setStatus(e.currentTarget);
  const handleCloseStatus = () => setStatus(null);

  // status deyishmek ucun kodlar

  const [changeStatus, setChangeStatus] = useState();

  const handleChangeStatus = () => {
    axiosInstance.patch(`/rows/${id}`, { status: changeStatus }).then(() => {
      refreshData();
      handleCloseStatus();
    });
  };

  // status deyishmek ucun olan kodlarin sonu

  // silmek ucun kodlar
  const [deleteModal, setdeleteModal] = useState(false);
  const handleOpenModal = () => setdeleteModal(true);
  const handleCloseModal = () => setdeleteModal(false);

  // edit ucun kodlar
  const [rowDetails, setRowDetails] = useState();
  const [editModal, setEditModal] = useState(false);
  const handleEditModal = () => {
    setEditModal(true);
    const details = rows.find((item) => item.id === id);
    setRowDetails(details);
  };

  const handleCloseEditModal = () => setEditModal(false);

  return (
    <>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            boxShadow: "0px 4px 55px rgba(0, 0, 0, 0.07)",

            "&::before": {
              width: "12px",
              height: "12px",
              background: "white",
              position: "absolute",
              top: 0,
            },
          },
        }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <Button onClick={handleEditModal} startIcon={<CreateOutlinedIcon />} sx={{ color: "#5F646E" }}>
            Düzəliş et
          </Button>
        </MenuItem>
        <MenuItem>
          <Button startIcon={<DeleteOutlineIcon />} onClick={handleOpenModal} sx={{ color: "#5F646E" }}>
            Sil
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            startIcon={<LocalPrintshopOutlinedIcon />}
            sx={{ color: "#5F646E" }}
            id="status-button"
            aria-controls={status ? "status-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={status ? "true" : undefined}
            onClick={handleClickStatus}
          >
            Statusu dəyiş
          </Button>
          <Menu
            id="status-menu"
            aria-labelledby="status-button"
            anchorEl={status}
            open={openStatus}
            onClose={handleCloseStatus}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "12px",
                boxShadow: "0px 4px 55px rgba(0, 0, 0, 0.07)",
                width: "250px",
              },
            }}
          >
            <MenuItem
              sx={{
                borderBottom: "1px solid #F1F1F1",
                "&:hover": { background: "transparent" },
                cursor: "auto",
                ...(changeStatus === "təsdiqlənib" && { background: "rgba(0, 0, 0, 0.1)" }),
              }}
            >
              <Button
                sx={{ textTransform: "none", backgroundColor: "#ECFDF3", borderRadius: "24px", margin: "11px 0" }}
                fullWidth
                onClick={() => {
                  setChangeStatus("təsdiqlənib");
                }}
              >
                <Typography sx={{ color: "#488C6E" }}>təsdiqlənib</Typography>
              </Button>
            </MenuItem>
            <MenuItem
              sx={{
                borderBottom: "1px solid #F1F1F1",
                "&:hover": { background: "transparent" },
                cursor: "auto",
                ...(changeStatus === "gözləyir" && { background: "rgba(0, 0, 0, 0.1)" }),
              }}
            >
              <Button
                sx={{ textTransform: "none", backgroundColor: "#FFFAE8", borderRadius: "24px", margin: "11px 0" }}
                fullWidth
                onClick={() => {
                  setChangeStatus("gözləyir");
                }}
              >
                <Typography sx={{ color: "#E0B300" }}>gözləyir</Typography>
              </Button>
            </MenuItem>
            <MenuItem
              sx={{
                cursor: "auto",
                "&:hover": { background: "transparent" },
                ...(changeStatus === "xitam olunub" && { background: "rgba(0, 0, 0, 0.1)" }),
              }}
            >
              <Button
                sx={{ textTransform: "none", backgroundColor: "#FFF7F7", borderRadius: "24px", border: "1px solid #FF463D", margin: "11px 0" }}
                fullWidth
                onClick={() => {
                  setChangeStatus("xitam olunub");
                }}
              >
                <Typography sx={{ color: "#FF463D" }}>xitam olunub</Typography>
              </Button>
            </MenuItem>
            <MenuItem sx={{ cursor: "auto" }}>
              <ButtonGroup sx={{ display: "flex", justifyContent: "space-between" }} fullWidth>
                <Button
                  onClick={handleCloseStatus}
                  sx={{ width: "98px", borderRightColor: "rgba(38, 106, 235, 0.5) !important", borderRadius: "8px !important" }}
                >
                  İmtina
                </Button>
                <Button variant="contained" sx={{ width: "98px", borderRadius: "8px !important" }} onClick={handleChangeStatus}>
                  Təsdiqlə
                </Button>
              </ButtonGroup>
            </MenuItem>
          </Menu>
        </MenuItem>
      </Menu>
      <ModalDelete deleteModal={deleteModal} id={id} handleCloseModal={handleCloseModal} refreshData={refreshData} />
      <Edit
        allData={allData}
        rows={rows}
        rowDetails={rowDetails}
        editModal={editModal}
        handleCloseEditModal={handleCloseEditModal}
        handleEditModal={handleEditModal}
        setRowDetails={setRowDetails}
        id={id}
      />
    </>
  );
};

export default UserMoreActions;
