import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// icon
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import "./profile.css"

function createData(DATE, Order_ID, Total_Ammount, Cost_back, Used) {
  return { DATE, Order_ID, Total_Ammount, Cost_back, Used };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),


];

export default function DenseTable(props) {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: "20px", maxHeight: 400 }}
    >
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell className="table-font" align="center">
              Date
            </TableCell>
            <TableCell className="table-font" align="center">
              Payment-ID
            </TableCell>
            <TableCell className="table-font" align="center">
              Amount
            </TableCell>
            <TableCell className="table-font" align="center">
              {" "}
              Cashback
            </TableCell>
            <TableCell className="table-font" align="center">
              Success
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.transactions.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.payment_date}</TableCell>
              <TableCell align="center">{row.payment_id}</TableCell>
              <TableCell align="center">{row?.payment_amount}</TableCell>
              <TableCell align="center">{row?.Cost_back}</TableCell>
              {row.isPaid ? (
                <TableCell align="center">{"yes"}</TableCell>
              ) : (
                <TableCell align="center">{"no"}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
