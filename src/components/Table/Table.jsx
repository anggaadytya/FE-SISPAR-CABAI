import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useEffect} from "react";

const makeStyle = (status) => {
  if (status === 1) {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  }
};

export default function BasicTable({getdatauser}) {

  useEffect(() => {
    console.log("get Data User:", getdatauser);
  });

  return (
    <div className="Table mt-5">
      <h3>Data Admin</h3>

      <TableContainer
        component={Paper}
        className="tableAll-wrapper-scroll-y tableAll-custom-scrollbar"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead className="TableHeadBasiskasus">
            <TableRow >
              <TableCell align="center" width={100}>User Id</TableCell>
              <TableCell align="center">UserName</TableCell>
              <TableCell align="center">FullName</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getdatauser.map((row) => (
              <TableRow
                key={row.user_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.user_id}
                </TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
