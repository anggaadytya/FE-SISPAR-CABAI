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
import "./TableBasisKasus.css";
import Swal from "sweetalert2";

export default function BasicTable({
  getDataBkAll,
  onInfoButtonClick,
  handleDeleteButtonClick,
}) {
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
        className="tableBk-wrapper-scroll-y tableBk-custom-scrollbar"
      >
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead className="TableHeadBasiskasus">
            <TableRow>
              <TableCell align="center" width={100} className="fw-bold">
                Id Basis Kasus
              </TableCell>
              <TableCell align="center" className="fw-bold">
                Id Hapen
              </TableCell>
              <TableCell align="center" className="fw-bold">
                Id Gejala
              </TableCell>
              <TableCell align="center" className="fw-bold">
                Bobot
              </TableCell>
              <TableCell align="center" width={200} className="fw-bold">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getDataBkAll.map((row) => (
              <TableRow
                key={row.id_basiskasus}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id_basiskasus}
                </TableCell>
                <TableCell align="center">
                  {row.id_hapen
                    ? `${row.id_hapen} - ${row.nama_hapen}`
                    : row.nama_hapen}
                </TableCell>
                <TableCell align="left">
                  {row.idGejala.split(",").map((idGejala, index) => (
                    <div key={index} style={{ margin: "10px 20px" }}>
                      {idGejala} - {row.namaGejala.split(",")[index]}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {row.bobots.split(",").map((bobot, index) => (
                    <div key={index} style={{ margin: "10px 20px" }}>
                      {bobot}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="center" className="btn">
                  <IconButton onClick={() => onInfoButtonClick(row)}>
                    <InfoIcon className="btn-edit" />
                  </IconButton>
                  <IconButton onClick={() => showDeleteConfirmation(row)}>
                    <DeleteIcon className="btn-delete" />
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
