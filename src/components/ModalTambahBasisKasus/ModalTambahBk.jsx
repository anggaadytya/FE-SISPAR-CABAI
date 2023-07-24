import { useEffect, useState } from "react";
import "./ModalTambahBk.css";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ModalTambahGejala = ({
  openTambahModal,
  onCloseTambahModal,
  onTambahData,
  lastIdBk,
}) => {
  const [formData, setFormData] = useState({
    id_basiskasus: lastIdBk,
    id_hapen: "",
    id_gejala: [],
  });

  const [gejalaList, setGejalaList] = useState([]);
  const [hapenList, setHapenList] = useState([]);

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchGejalaData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gejala");
      if (!response.ok) {
        throw new Error("Gagal mengambil data gejala");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data gejala:", error);
      throw error;
    }
  };

  const fetchHapenData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/hapen");
      if (!response.ok) {
        throw new Error("Gagal mengambil data hapen");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data hapen:", error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const gejalaData = await fetchGejalaData();
      const hapenData = await fetchHapenData();
      setGejalaList(gejalaData);
      setHapenList(hapenData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (event.target.multiple) {
      const selectedValues = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prevData) => ({ ...prevData, [name]: selectedValues }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleTambahButtonClick = () => {
    if (!formData.id_hapen || !formData.id_gejala) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hapen dan Gejala harus diisi.",
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
        id_basiskasus: lastIdBk,
        id_hapen: "",
        id_gejala: [],
      });
      onCloseTambahModal();
    } catch (error) {
      console.error("Error menambah data:", error);
    }
  };

  return (
    <Dialog
      open={openTambahModal}
      onClose={onCloseTambahModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Tambah Data Basis Kasus</DialogTitle>
      <DialogContent>
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="id_hapen">Pilih Hapen</InputLabel>
            <Select
              name="id_hapen"
              value={formData.id_hapen || ""}
              onChange={handleInputChange}
            >
              {hapenList.map((hapen) => (
                <MenuItem key={hapen.id_hapen} value={hapen.id_hapen}>
                  {hapen.nama_hapen}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="id_gejala">Pilih Gejala</InputLabel>
            <Select
              name="id_gejala"
              multiple
              value={formData.id_gejala || []}
              onChange={handleInputChange}
            >
              {gejalaList.map((gejala) => (
                <MenuItem key={gejala.id_gejala} value={gejala.id_gejala}>
                  {gejala.nama_gejala}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          style={{ backgroundColor: "rgb(29, 161, 161)", color: "white" }}
        >
          Batal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTambahGejala;
