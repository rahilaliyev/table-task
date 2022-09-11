import { Autocomplete, Box, createFilterOptions, Grid, IconButton, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import axiosInstance from "helpers/axiosInstance";
import TableProducts from "./TableProducts";
import Loading from "components/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  background: "#FFFFFF",
  boxShadow: "0px 4px 55px rgba(0, 0, 0, 0.07)",
  borderRadius: "12px",
  p: 3,
};

const AddNew = ({ addModal, handleCloseAddModal, allTableData, handleSuccessModal, handleCloseSuccessModal, refreshData }) => {
  const theme = useTheme();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [selectedName, setSelectedName] = useState([]);
  const [selectedProduct, setSeletedProduct] = useState();

  const handleChangeName = (e, value) => setSelectedName(value.name);
  const handleChangeProduct = (e, value) => setSeletedProduct(value);

  const [tableData, setTableData] = useState([]);

  const productObject = {
    id: tableData.length === 0 ? 1 : tableData.length + 1,
    name: selectedName,
    product: selectedProduct?.name,
    minProductCount: 1,
    maxProductCount: selectedProduct?.count,
    price: selectedProduct?.price,
  };

  //mehsulu table`a elave etmek ucun funksiya

  const addRowTable = () => {
    setTableData((old) => [...old, productObject]);
  };

  // umumi meblegi hesablamaq ucun
  const initialValue = 0;
  const total = tableData.reduce((accumulator, current) => accumulator + current.price * current.minProductCount, initialValue);

  // umumi mehsul sayini hesablamaq ucun
  const initialValueProduct = 0;
  const totalProduct = tableData.reduce((accumulator, current) => accumulator + current.minProductCount, initialValueProduct);

  // modaldan cixmaq istedikde eger mehsul elave edilibse onun silinmesi ucun

  const closeModal = () => {
    handleCloseAddModal();
    setTableData([]);
  };

  // yeni qaimeni gondermek ucun request

  const handleSubmitNewData = () => {
    setLoading(true);
    const obj = {
      id: allTableData.length + 1,
      name: selectedName,
      avatar: "",
      amount: total,
      count: totalProduct,
      status: "gözləyir",
    };

    axiosInstance
      .post("/rows", obj)
      .then(() => {
        setLoading(false);
        handleCloseAddModal();
        handleSuccessModal();
        refreshData();

        setTimeout(() => {
          handleCloseSuccessModal();
        }, 3000);
      })
      .catch(() => setLoading(false));
  };
  return (
    <Modal open={addModal} onClose={handleCloseAddModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <IconButton size="large" onClick={closeModal} sx={{ position: "absolute", top: "31px", right: "28px" }}>
          <CloseIcon />
        </IconButton>
        <Typography sx={{ color: theme.palette.primary.main }} variant="h5" component="h5">
          Qaimə
        </Typography>
        <Box component={"form"} mt={2}>
          {loading ? (
            <Loading />
          ) : (
            <Grid container spacing={4} justifyContent={"space-between"}>
              <Grid item md={4} xs={12}>
                <Typography>Müştəri</Typography>
                <Autocomplete
                  popupIcon={<KeyboardArrowDownIcon />}
                  disablePortal
                  id="combo-box-demo"
                  options={allTableData}
                  getOptionLabel={(option) => option.name ?? option}
                  noOptionsText={"Müştəri tapılmadı"}
                  onChange={handleChangeName}
                  renderOption={(props, option) => (
                    <li {...props} style={{ margin: "10px 0", borderBottom: "1px solid #EDEFF1" }}>
                      <span>{option.name}</span>
                    </li>
                  )}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                      background: "#FAFCFE",
                      height: "40px",
                      paddingTop: "2px",
                      marginTop: "4px",
                      "input::placeholder": {
                        fontSize: "14px",
                        lineHeight: "20px",
                      },
                    },
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: "200px",
                      border: "1px solid #EDEFF1",
                      boxShadow: "0px 4px 55px rgba(0, 0, 0, 0.07)",
                      borderRadius: "12px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={"Ad"}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ width: "18px", height: "18px" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Typography>Məhsulun adı</Typography>

                <Autocomplete
                  fullWidth
                  popupIcon={<KeyboardArrowDownIcon />}
                  id="combo-box-demo"
                  options={products}
                  noOptionsText={"Məhsul tapılmadı"}
                  onChange={handleChangeProduct}
                  getOptionLabel={(option) => option.name || ""}
                  filterOptions={createFilterOptions({
                    stringify: (option) => option.name + option.id,
                  })}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                      background: "#FAFCFE",
                      height: "40px",
                      paddingTop: "2px",
                      marginTop: "4px",
                      "input::placeholder": {
                        fontSize: "14px",
                        lineHeight: "20px",
                      },
                    },
                  }}
                  renderOption={(props, option) => (
                    <li {...props} style={{ margin: "10px 0", borderBottom: "1px solid #EDEFF1", display: "flex", justifyContent: "space-between" }}>
                      <span>
                        {option.name} ({option.count} ədəd)
                      </span>
                      <span style={{ fontWeight: 600 }}>{option.price} AZN</span>
                    </li>
                  )}
                  ListboxProps={{
                    style: {
                      maxHeight: "200px",
                      border: "1px solid #EDEFF1",
                      boxShadow: "0px 4px 55px rgba(0, 0, 0, 0.07)",
                      borderRadius: "12px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={"Ad"}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ width: "18px", height: "18px" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} sx={{ paddingLeft: "0 !important", display: "flex", alignItems: "flex-end" }}>
                <IconButton
                  onClick={addRowTable}
                  size="large"
                  sx={{ backgroundColor: theme.palette.primary.main, height: "40px", width: "70px", borderRadius: "8px", color: "white" }}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
              {tableData.length !== 0 && (
                <Grid item xs={12} sx={{ marginTop: "200px" }}>
                  <TableProducts
                    tableData={tableData}
                    setTableData={setTableData}
                    closeModal={closeModal}
                    handleSubmitNewData={handleSubmitNewData}
                    total={total}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNew;
