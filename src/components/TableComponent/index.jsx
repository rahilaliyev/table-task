import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TableElement from "components/TableElement";
import { useState } from "react";
import axiosInstance from "helpers/axiosInstance";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const TableComponent = ({ allData, rows, setRows, filteredData, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const headLabel = [
    { id: "id", label: "Qaimə №", alignRight: false },
    { id: "name", label: "Müştəri", alignRight: false },
    { id: "count", label: "Məhsul sayı", alignRight: false },
    { id: "amount", label: "Toplam məbləğ", alignRight: false },
    { id: "status", label: "Status", alignRight: false },
  ];

  // siralamani yuxaridan ashagiya ve ya ashagidan yuxariya etmek ucun funksiya -- sorting

  const [sortingDirection, setSortingDirection] = useState("desc");

  const handleSorting = (e) => {
    setLoading(true);
    axiosInstance
      .get(`/rows?_sort=${e.target.id}&_order=${sortingDirection}`)
      .then((res) => {
        setRows(res.data);
        sortingDirection === "desc" ? setSortingDirection("asc") : setSortingDirection("desc");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // sortingin sonu

  return (
    <TableContainer component={Paper} sx={{ marginTop: "33px", borderRadius: 0, boxShadow: "none" }}>
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
                <Button
                  sx={{ color: "inherit" }}
                  endIcon={sortingDirection === "desc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                  id={headCell.id}
                  onClick={handleSorting}
                >
                  {headCell.label}
                </Button>
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
          {filteredData.length === 0
            ? rows?.map((row) => <TableElement allData={allData} refreshData={refreshData} row={row} rows={rows} />)
            : filteredData.map((filter) => <TableElement allData={allData} refreshData={refreshData} row={filter} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
