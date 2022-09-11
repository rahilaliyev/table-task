import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import UserMoreActions from "components/UserMoreActions";

const TableElement = ({ row, refreshData, rows, allData }) => {
  return (
    <TableRow
      key={row.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "& td, & th": {
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: "20px",
        },
      }}
    >
      <TableCell align="left" sx={{ padding: "0 16px" }}>
        {row.id}
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={row.name} src={row.avatar} />
          <Typography variant="subtitle2" noWrap>
            {row.name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">{row.count}</TableCell>
      <TableCell align="left">$ {row.amount}</TableCell>
      <TableCell align="left">
        <Typography
          component={"span"}
          variant={"span"}
          sx={{
            padding: "6px 12px",
            borderRadius: "24px",
            ...(row.status === "təsdiqlənib"
              ? { backgroundColor: "#ECFDF3;", color: "#488C6E" }
              : row.status === "gözləyir"
              ? { backgroundColor: "#FFFAE8", color: "#E0B300" }
              : { backgroundColor: "#FFF7F7", color: "#FF463D" }),
          }}
        >
          {row.status}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <UserMoreActions id={row.id} refreshData={refreshData} rows={rows} allData={allData} />
      </TableCell>
    </TableRow>
  );
};

export default TableElement;
