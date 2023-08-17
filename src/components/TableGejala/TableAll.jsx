import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TableAl.css";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function BasicTable({
  getDataGejalaAll,
  onInfoButtonClick,
  handleDeleteButtonClick,
}) {
  useEffect(() => {
    console.log("get Data Gejala:", getDataGejalaAll);
  });

  const showDeleteConfirmation = (row) => {
    Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus data ini?",
      showCancelButton: true,
      confirmButtonColor: "chocolate",
      cancelButtonColor: "rgb(29, 161, 161)",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteButtonClick(row);
      }
    });
  };

  return (
    <div className="Table mt-5">
      <TableContainer
        component={Paper}
        className="tableGejala-wrapper-scroll-y tableGejala-custom-scrollbar"
      >
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead className="TableHeadGejala">
            <TableRow>
              <TableCell align="center" width={120} className="fw-bold">
                Id Gejala
              </TableCell>
              <TableCell align="center" className="fw-bold">
                Nama Gejala
              </TableCell>
              <TableCell align="center" width={200} className="fw-bold">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getDataGejalaAll.map((row, index) => (
              <TableRow
                key={row.id_gejala}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id_gejala}
                </TableCell>
                <TableCell align="left" width={400}>
                  {row.nama_gejala}
                </TableCell>
                <TableCell align="center" className="btn">
                  <IconButton>
                    <InfoIcon
                      className="btn-edit"
                      onClick={() => onInfoButtonClick(row)}
                    />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon
                      className="btn-delete"
                      onClick={() => showDeleteConfirmation(row)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
