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
import "./TableHapen.css";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function BasicTable({
  getDataHapenAll,
  onInfoButtonClick,
  handleDeleteButtonClick,
}) {
  useEffect(() => {
    console.log("get Data Gejala:", getDataHapenAll);
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
        className="tableHapen-wrapper-scroll-y tableHapen-custom-scrollbar"
      >
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead className="TableHeadHapen">
            <TableRow>
              <TableCell align="center" width={100} className="fw-bold">
                Id Hapen
              </TableCell>
              <TableCell align="center" className="fw-bold">
                Nama Hapen
              </TableCell>
              <TableCell align="center" className="fw-bold">
                Detail
              </TableCell>
              <TableCell align="center" className="fw-bold">
                Solusi
              </TableCell>
              <TableCell align="center" width={200} className="fw-bold">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getDataHapenAll.map((row, index) => (
              <TableRow
                key={row.id_hapen}
                sx={{
                  "&:last-child td, &:last-child th": { border: 1 },
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id_hapen}
                </TableCell>
                <TableCell align="center">{row.nama_hapen}</TableCell>
                <TableCell align="justify">{row.detail}</TableCell>
                <TableCell align="justify">{row.solusi}</TableCell>
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
