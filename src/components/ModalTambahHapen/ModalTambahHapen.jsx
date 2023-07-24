import { useState } from "react";
import "./ModalTambahHapen.css";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ModalTambahHapen = ({
  openTambahModal,
  onCloseTambahModal,
  onTambahData,
  lastIdHapen,
}) => {
  const [formData, setFormData] = useState({
    id_hapen: lastIdHapen,
    nama_hapen: "",
    detail: "",
    solusi: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTambahButtonClick = () => {
    if (!formData.nama_hapen || !formData.detail || !formData.solusi) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Nama Hapen, Detail dan Solusi harus diisi.",
        confirmButtonColor: "chocolate",
        customClass: {
          container: "my-swal-container",
        },
      });
    }
    Swal.fire({
      icon: "question",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menambahkan data?",
      confirmButtonText: "OK",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "chocolate",
      cancelButtonColor: "rgb(29, 161, 161)",
      customClass: {
        container: "my-swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleTambahData();
      }
    });
  };

  const handleTambahData = async () => {
    try {
      await onTambahData(formData);
      setFormData({
        id_hapen: lastIdHapen,
        nama_hapen: "",
        detail: "",
        solusi: "",
      });
      onCloseTambahModal();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <Dialog
      open={openTambahModal}
      onClose={onCloseTambahModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Tambah Data Hama Penyakit</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            label="Nama Hapen"
            name="nama_hapen"
            value={formData.nama_hapen}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required=""
          />
          <TextField
            label="Detail"
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required=""
          />
          <TextField
            label="Solusi"
            name="solusi"
            value={formData.solusi}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required=""
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleTambahButtonClick}
          style={{ backgroundColor: "chocolate", color: "white" }}
        >
          Tambah Data
        </Button>
        <Button
          onClick={onCloseTambahModal}
          style={{ backgroundColor: " rgb(29, 161, 161)", color: "white" }}
        >
          Batal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTambahHapen;
