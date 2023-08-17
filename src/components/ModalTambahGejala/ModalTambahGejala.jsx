import { useState } from "react";
import "./ModalTambahGejala.css";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ModalTambahGejala = (props) => {
  const {openTambahModal, onCloseTambahModal, onTambahData, lastIdGejala} = props;
  const [formData, setFormData] = useState({
    id_gejala: lastIdGejala,
    nama_gejala: "",
    bobot: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTambahButtonClick = () => {
    if (!formData.nama_gejala || !formData.bobot) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Nama gejala dan bobot harus diisi.",
        confirmButtonColor: "var(--green)",
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
      confirmButtonColor: "var(--green)",
      cancelButtonColor: "var(--gray)",
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
        id_gejala: lastIdGejala,
        nama_gejala: "",
        bobot: "",
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data gejala berhasil ditambahkan",
        confirmButtonColor: "chocolate",
        customClass: {
            container: "my-swal-container",
          },
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
      <DialogTitle>
        Tambah Data Gejala
      </DialogTitle>
      <DialogContent>
        <div>
          <TextField
            label="Nama Gejala"
            name="nama_gejala"
            value={formData.nama_gejala}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required=""
          />
          <TextField
            label="Bobot"
            name="bobot"
            value={formData.bobot}
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
          style={{ backgroundColor: "var(--green)", color: "white" }}
        >
          Tambah Data
        </Button>
        <Button
          onClick={onCloseTambahModal}
          style={{ backgroundColor: " var(--gray)", color: "white" }}
        >
          Batal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTambahGejala;
