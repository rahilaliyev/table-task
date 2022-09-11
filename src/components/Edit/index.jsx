import { useEffect, useState } from "react";
import { Autocomplete, Box, createFilterOptions, Grid, IconButton, InputAdornment, Modal, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Loading from "components/Loading";
import axiosInstance from "helpers/axiosInstance";
import TableEditProducts from "./TableEditProduct";
import TableEditProduct from "./TableEditProduct";

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

const Edit = ({ allData, rowDetails, setRowDetails, editModal, handleCloseEditModal, handleEditModal, id, rows }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();

  const productObject = {
    id: rowDetails?.id,
    name: rowDetails?.name,
    product: "Sabun",
    minProductCount: rowDetails?.count,
    maxProductCount: null,
    price: rowDetails?.amount,
  };

  let tableDataArray = [];
  tableDataArray.push(productObject);

  const theme = useTheme();

  useEffect(() => {
    setLoading(true);

    if (editModal && rowDetails) {
      axiosInstance
        .get("/products")
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [rowDetails]);

  const [selectedProduct, setSeletedProduct] = useState();

  const handleChangeName = (e, value) => {
    setRowDetails((prevstate) => ({
      ...prevstate,
      name: value.name,
    }));
  };
  const handleChangeProduct = (e, value) => setSeletedProduct(value);

  //mehsulu table`a elave etmek ucun funksiya

  const newProductObject = {
    id: allData.length === 0 ? 1 : allData.length + 1,
    name: rowDetails?.name,
    product: selectedProduct?.name,
    minProductCount: 1,
    maxProductCount: selectedProduct?.count,
    price: selectedProduct?.price,
  };

  const addRowTable = () => {
    tableDataArray.push((old) => [...old, newProductObject]);
  };

  // umumi meblegi hesablamaq ucun
  const initialValue = 0;
  const total = tableDataArray.reduce((accumulator, current) => accumulator + current.price * current.minProductCount, initialValue);

  // umumi mehsul sayini hesablamaq ucun
  const initialValueProduct = 0;
  const totalProduct = tableDataArray.reduce((accumulator, current) => accumulator + current.minProductCount, initialValueProduct);

  return (
    <Modal open={editModal} onClose={handleCloseEditModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <IconButton size="large" onClick={handleCloseEditModal} sx={{ position: "absolute", top: "31px", right: "28px" }}>
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
                  value={rowDetails?.name}
                  options={rows}
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
              {tableDataArray.length !== 0 && (
                <Grid item xs={12} sx={{ marginTop: "200px" }}>
                  <TableEditProduct
                    tableData={tableDataArray}
                    // setTableData={setTableData}
                    closeModal={handleCloseEditModal}
                    // handleSubmitNewData={handleSubmitNewData}
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

export default Edit;
