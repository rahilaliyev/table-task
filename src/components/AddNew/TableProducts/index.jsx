import {
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TableProducts = ({ tableData, setTableData, closeModal, handleSubmitNewData, total }) => {
  const theme = useTheme();
  const headLabel = [
    { id: "name", label: "Məhsul adı", alignRight: false },
    { id: "count", label: "Miqdar", alignRight: false },
    { id: "price", label: "Qiymət", alignRight: false },
    { id: "total", label: "Toplam məbləğ", alignRight: false },
  ];

  // mehsulun sayi artirmaq ve artirdiqdan sonra onun toplam meblegini deyishmek ucun funksiya

  const updateFieldChanged = (id, e) => {
    setTableData(tableData.map((item) => (item.id === id ? { ...item, minProductCount: Number(e.target.value) } : item)));
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: "96%", padding: "22px", marginTop: "33px", borderRadius: "12px", boxShadow: "none", border: "1px solid #ECECEE" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ borderRadius: "8px" }}>
            <TableRow sx={{ "& td, & th": { border: 0 }, "& th": { padding: "9px 16px" } }}>
              {headLabel.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.alignRight ? "right" : "left"}
                  sx={{
                    background: "#FAFAFC",
                    "&:first-child": {
                      borderRadius: "10px 0 0 10px;",
                    },
                    "&:last-child": {
                      borderRadius: "0 10px 10px 0;",
                    },
                  }}
                >
                  <Button sx={{ color: "inherit" }}>{headCell.label}</Button>
                </TableCell>
              ))}
              <TableCell
                align={"left"}
                sx={{
                  background: "#FAFAFC",
                  "&:first-child": {
                    borderRadius: "10px 0 0 10px;",
                  },
                  "&:last-child": {
                    borderRadius: "0 10px 10px 0;",
                  },
                }}
              >
                Əmrlər
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((table, key) => (
              <TableRow
                key={key}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& td, & th": {
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                  },
                  "& td": {
                    padding: "10px 25px",
                  },
                }}
              >
                <TableCell align="left">{table.product}</TableCell>
                <TableCell align="left">
                  <TextField
                    type="number"
                    value={table.minProductCount}
                    onChange={(e) => updateFieldChanged(table.id, e)}
                    InputProps={{ inputProps: { min: 1, max: table.maxProductCount } }}
                    size="small"
                    sx={{ width: "75px" }}
                  />
                </TableCell>
                <TableCell align="left">{table.price} AZN</TableCell>
                <TableCell align="left">{table.price * table.minProductCount} AZN</TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack flexDirection={"row"} justifyContent={"flex-end"} mt={2}>
        <Typography component={"h6"} variant={"h6"} sx={{ color: theme.palette.primary.main }}>
          Toplam: $ {total}
        </Typography>
      </Stack>
      <Stack flexDirection={"row"} justifyContent={"flex-end"} mt={2}>
        <ButtonGroup>
          <Button
            onClick={closeModal}
            sx={{ borderRadius: "8px !important", width: "150px", marginRight: "20px", borderRightColor: "#266AEB !important" }}
          >
            İmtina et
          </Button>
          <Button onClick={handleSubmitNewData} variant="contained" sx={{ borderRadius: "8px !important", width: "150px" }}>
            Yadda saxla
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  );
};

export default TableProducts;
