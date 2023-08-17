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

const ModalComponent = (props) => {
  const { openModal, selectedData, onCloseModal, onEditData } = props;
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
      confirmButtonColor: "var(--green)",
      cancelButtonColor: "var(--gray)",
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
          <DialogTitle>Detail Hapen {selectedData.id_hapen}</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Id Hapen"
                name="id_hapen"
                defaultValue={selectedData.id_hapen}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Edit Nama Hapen"
                name="nama_hapen"
                value={editedData.nama_hapen || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Edit Detail Hapen"
                name="detail"
                value={editedData.detail || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Edit Solusi Hapen"
                name="solusi"
                value={editedData.solusi || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleEditButtonClick}
              style={{ backgroundColor: "var(--green)", color: "white" }}
            >
              Edit Data
            </Button>
            <Button
              onClick={onCloseModal}
              style={{ backgroundColor: "var(--gray)", color: "white" }}
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
