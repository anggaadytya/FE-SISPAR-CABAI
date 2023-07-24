import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ModalComponent = ({
  openModal,
  selectedData,
  onCloseModal,
  onEditData,
}) => {
  const [editedData, setEditedData] = useState(onEditData);


  useEffect(() => {
    if (selectedData) {
      setEditedData({
        ...selectedData,
      });
    }
  }, [selectedData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditButtonClick = () => {
    onCloseModal();
    Swal.fire({
      icon: "question",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin mengubah data?",
      confirmButtonText: "OK",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "chocolate",
      cancelButtonColor: "grey",
    }).then((result) => {
      if (result.isConfirmed) {
        onEditData(editedData);
      }
    });
  };


  return (
    <Dialog open={openModal} onClose={onCloseModal} maxWidth="sm" fullWidth>
      {selectedData ? (
        <div>
          <DialogTitle>Detail Gejala {selectedData.id_gejala}</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Id gejala"
                name="id_gejala"
                defaultValue={selectedData.id_gejala}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Edit Nama Gejala"
                name="nama_gejala"
                value={editedData.nama_gejala || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Edit Bobot"
                name="bobot"
                value={editedData.bobot || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleEditButtonClick}
              style={{ backgroundColor: "chocolate", color: "white" }}
            >
              Edit Data
            </Button>
            <Button
              onClick={onCloseModal}
              style={{ backgroundColor: " rgb(29, 161, 161)", color: "white" }}
            >
              Kembali
            </Button>
          </DialogActions>
        </div>
      ) : (
        <DialogContent>
          <DialogContentText>Tidak ada data yang dipilih.</DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ModalComponent;
