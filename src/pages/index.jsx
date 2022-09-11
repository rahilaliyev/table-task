import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as FilterSvg } from "assets/Filter.svg";
import { makeStyles } from "@mui/styles";
import TableComponent from "components/TableComponent";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "helpers/axiosInstance";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddNew from "components/AddNew";
import SuccessModal from "components/AddNew/SuccessModal";
import Loading from "components/Loading";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "8px !important",
    marginLeft: "16px !important",
    lineHeight: "18px !important",
  },
  input: {
    width: "450px !important",
    [theme.breakpoints.down("md")]: {
      width: "100% !important",
    },
    borderRadius: "18px",
    background: "#FAFCFE",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #EDEFF1",
        borderRadius: "18px",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.neutral700,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));
const Pages = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [currentTableData, setcurrentTableData] = useState();
  const [allTableData, setAllTableData] = useState();
  const [loading, setLoading] = useState(false);

  const getAllData = () => {
    setLoading(true);
    axiosInstance
      .get("/rows")
      .then((res) => {
        setAllTableData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  useEffect(() => {
    getAllData();
  }, []);

  //pagination ucun

  const inputRef = useRef();
  const [page, setPage] = useState(1);

  const getData = () => {
    setLoading(true);
    axiosInstance
      .get(`/rows?_page=${page}&_limit=8`)
      .then((res) => {
        setcurrentTableData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleGoPage = () => {
    setPage(Number(inputRef.current.value));
  };

  //pagination ucun olan kodun sonu

  // axtarish ucun

  const [filteredData, setfilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchWord = e.target.value;
    const newFilter = allTableData.filter((value) => {
      return isNaN(searchWord) ? value.name.toLowerCase().includes(searchWord.toLowerCase()) : value.id.toString().includes(searchWord);
    });

    if (searchWord === "") {
      setfilteredData([]);
    } else {
      setfilteredData(newFilter);
    }
  };

  // axtarish ucun olan kodun sonu

  // melumatlari yenilemek ucun funksiya
  const refreshData = () => {
    getData();
    getAllData();
  };

  // filterizasiya ucun

  const [filterSection, setFilterSection] = useState(false);

  const handleFilter = () => {
    setFilterSection(!filterSection);
  };

  const [filterCount, setFilterCount] = useState();
  const [filterAmountFrom, setFilterAmountFrom] = useState();
  const [filterAmountTo, setFilterAmountTo] = useState();
  const [filterStatus, setFilterStatus] = useState();

  const handleFilterCount = (e) => setFilterCount(e.target.value);
  const handleFilterAmount = (e) => {
    setFilterAmountFrom(e.target.value);
    e.target.value === 50 ? setFilterAmountTo(1500) : e.target.value === 1500 ? setFilterAmountTo(5000) : setFilterAmountTo(10000);
  };
  const handleFilterStatus = (e) => setFilterStatus(e.target.value);

  useEffect(() => {
    setLoading(true);
    if (filterCount && filterAmountFrom && filterStatus) {
      axiosInstance
        .get(`/rows?count=${filterCount}&amount_gte=${filterAmountFrom}&amount_lte=${filterAmountTo}&status=${filterStatus}`)
        .then((res) => {
          setcurrentTableData(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    if (filterCount && !filterAmountFrom && !filterStatus) {
      axiosInstance
        .get(`/rows?count=${filterCount}`)
        .then((res) => {
          setcurrentTableData(res.data);
          setLoading(false);
        })
        .catch(setLoading(false));
    }
    if (filterStatus && !filterAmountFrom && !filterCount) {
      axiosInstance
        .get(`/rows?status=${filterStatus}`)
        .then((res) => {
          setcurrentTableData(res.data);
          setLoading(false);
        })
        .catch(setLoading(false));
    }
    if (filterAmountFrom && !filterCount && !filterStatus) {
      axiosInstance
        .get(`/rows?amount_gte=${filterAmountFrom}&amount_lte=${filterAmountTo}`)
        .then((res) => {
          setcurrentTableData(res.data);
          setLoading(false);
        })
        .catch(setLoading(false));
    }
    if (filterCount && filterAmountFrom && !filterStatus) {
      axiosInstance
        .get(`/rows?count=${filterCount}&amount_gte=${filterAmountFrom}&amount_lte=${filterAmountTo}`)
        .then((res) => {
          setcurrentTableData(res.data);
          setLoading(false);
        })
        .catch(setLoading(false));
    }
    if (filterCount && filterStatus && !filterAmountFrom) {
      axiosInstance
        .get(`/rows?count=${filterCount}&status=${filterStatus}`)
        .then((res) => {
          setcurrentTableData(res.data);
          setLoading(false);
        })
        .catch(setLoading(false));
    }
    if (filterAmountFrom && filterStatus && !filterCount) {
      axiosInstance
        .get(`/rows?amount_gte=${filterAmountFrom}&amount_lte=${filterAmountTo}&status=${filterStatus}`)
        .then((res) => {
          setcurrentTableData(res.data);
          setLoading(false);
        })
        .catch(setLoading(false));
    }
  }, [filterCount, filterStatus, filterAmountFrom, filterAmountTo]);

  // filteri sifirlamaq ucun

  const selectRef = useRef();
  const handleReset = () => {
    window.location.reload();
  };

  // filterizasiya ucun olan kodun

  // yeni qaime ucun modal
  const [addModal, setAddModal] = useState(false);
  const handleAddModal = () => setAddModal(true);
  const handleCloseAddModal = () => setAddModal(false);

  //yeni qaime ugurlu olubsa onun ucu modal
  const [successModal, setsuccessModal] = useState(false);
  const handleSuccessModal = () => setsuccessModal(true);
  const handleCloseSuccessModal = () => setsuccessModal(false);

  return (
    <>
      <Box sx={{ border: "1px solid #ECECEE", borderRadius: "8px", height: "100%" }} py={2} px={2}>
        <Typography component={"h5"} variant={"h5"} sx={{ marginBottom: "28px" }}>
          Qaimələr
        </Typography>
        <Stack sx={{ flexDirection: { md: "row", sm: "column" } }} justifyContent={"space-between"}>
          <TextField
            size="small"
            className={classes.input}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Qaimə nömrəsi, müştəri adı üzrə axtar"
          />

          <ButtonGroup>
            {filterSection && (
              <Button
                className={classes.button}
                sx={{ border: "none", "&:hover, &:active, &:focus": { border: "none" }, color: theme.palette.primary.neutral700 }}
                onClick={handleReset}
              >
                Sıfırla
              </Button>
            )}
            <Button
              sx={{
                border: "1px solid #B6BCC9",
                borderRightColor: "#B6BCC9 !important",
                "&:hover": {
                  borderColor: `${theme.palette.primary.main} !important`,
                  borderRightColor: `${theme.palette.primary.main} !important`,
                  color: theme.palette.primary.main,
                  svg: {
                    path: {
                      fill: theme.palette.primary.main,
                    },
                  },
                },
                color: theme.palette.primary.neutral700,
                padding: "10px 18px",
              }}
              size="small"
              className={classes.button}
              onClick={handleFilter}
              startIcon={
                <SvgIcon>
                  <FilterSvg />
                </SvgIcon>
              }
            >
              Filter
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddModal} size="small" className={classes.button}>
              Yeni qaimə
            </Button>
          </ButtonGroup>
        </Stack>

        {filterSection && (
          <Box component={"form"} display="flex" pt={3} pb={1} width={450} justifyContent={"space-between"}>
            <Grid>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "14px", lineHeight: "18px", color: theme.palette.primary.primary700, marginBottom: "10px" }}
              >
                Məhsul sayı{" "}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                defaultValue={"default"}
                onChange={handleFilterCount}
                inputRef={selectRef}
                IconComponent={() => <KeyboardArrowDownIcon />}
                sx={{
                  padding: "0 10px ",
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.primary.neutral700}`,
                  svg: {
                    position: "absolute",
                    right: "10px",
                    pointerEvents: "none",
                    color: theme.palette.primary.neutral700,
                  },
                }}
              >
                <MenuItem value={"default"} disabled>
                  Seç
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </Grid>
            <Grid>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "14px", lineHeight: "18px", color: theme.palette.primary.primary700, marginBottom: "10px" }}
              >
                Məbləğ aralığı{" "}
              </InputLabel>
              <Select
                sx={{
                  borderRadius: "8px",
                  padding: "0 10px ",
                  border: `1px solid ${theme.palette.primary.neutral700}`,
                  svg: {
                    position: "absolute",
                    right: "10px",
                    pointerEvents: "none",
                    color: theme.palette.primary.neutral700,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                onChange={handleFilterAmount}
                defaultValue={"default"}
                IconComponent={() => <KeyboardArrowDownIcon />}
              >
                <MenuItem value={"default"} disabled>
                  Seç
                </MenuItem>
                <MenuItem value={50}>$ 50 - $ 1500</MenuItem>
                <MenuItem value={1500}>$ 1500 - $ 5000</MenuItem>
                <MenuItem value={5000}>$ 5000 - $ 10000</MenuItem>
              </Select>
            </Grid>
            <Grid>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "14px", lineHeight: "18px", color: theme.palette.primary.primary700, marginBottom: "10px" }}
              >
                Status{" "}
              </InputLabel>
              <Select
                sx={{
                  borderRadius: "8px",
                  padding: "0 10px ",
                  border: `1px solid ${theme.palette.primary.neutral700}`,
                  svg: {
                    position: "absolute",
                    right: "10px",
                    pointerEvents: "none",
                    color: theme.palette.primary.neutral700,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                defaultValue={"default"}
                onChange={handleFilterStatus}
                IconComponent={() => <KeyboardArrowDownIcon />}
              >
                <MenuItem value={"default"} disabled>
                  Seç
                </MenuItem>
                <MenuItem value={"təsdiqlənib"}>Təstiqlənib</MenuItem>
                <MenuItem value={"gözləyir"}>Gözləyir</MenuItem>
                <MenuItem value={"xitam olunub"}>Xitam olunub</MenuItem>
              </Select>
            </Grid>
          </Box>
        )}
        {loading ? (
          <Loading />
        ) : currentTableData?.length !== 0 ? (
          <TableComponent
            rows={currentTableData}
            allData={allTableData}
            setRows={setcurrentTableData}
            filteredData={filteredData}
            refreshData={refreshData}
          />
        ) : (
          <Typography>Məlumat tapılmadı</Typography>
        )}
      </Box>
      {currentTableData?.length > 0 && page > 0 && (
        <Stack flexDirection={"row"} justifyContent={"space-between"} marginTop={"7px"}>
          <Box sx={{ width: "10%" }} />
          <Pagination count={Math.ceil(allTableData?.length / 8)} shape="rounded" color="primary" page={page} onChange={handleChangePage} />
          <Stack flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
            <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "16px", margin: "auto" }}>Səhifəyə get</Typography>
            <TextField sx={{ width: 36, height: 32, marginLeft: "12px", "& .MuiInputBase-input": { padding: "6px" } }} inputRef={inputRef} />
            <Button endIcon={<ArrowForwardIosIcon />} sx={{ color: theme.palette.primary.neutral850 }} onClick={handleGoPage}>
              Get
            </Button>
          </Stack>
        </Stack>
      )}
      <AddNew
        addModal={addModal}
        allTableData={allTableData}
        handleCloseAddModal={handleCloseAddModal}
        handleSuccessModal={handleSuccessModal}
        handleCloseSuccessModal={handleCloseSuccessModal}
      />
      <SuccessModal
        refreshData={refreshData}
        successModal={successModal}
        handleSuccessModal={handleSuccessModal}
        handleCloseSuccessModal={handleCloseSuccessModal}
      />
    </>
  );
};

export default Pages;
