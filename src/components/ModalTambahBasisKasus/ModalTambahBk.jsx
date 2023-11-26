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
  TextField,
} from "@mui/material";

const ModalTambahGejala = (props) => {
  const {openTambahModal, onCloseTambahModal, onTambahData, lastIdBk} = props;
  const [gejalaList, setGejalaList] = useState([]);
  const [hapenList, setHapenList] = useState([]);
  const [formData, setFormData] = useState({
    id_basiskasus: lastIdBk,
    id_hapen: "",
    gejalaData: [
      {
        id_gejala: "",
        bobot: "0",
      },
    ],
  });

  const handleAddGejala = () => {
    setFormData((prevData) => ({
      ...prevData,
      gejalaData: [...prevData.gejalaData, { id_gejala: "", bobot: "0" }],
    }));
  };

  const handleRemoveGejala = (index) => {
    setFormData((prevData) => {
      const updatedGejalaData = prevData.gejalaData.filter(
        (_, i) => i !== index
      );
      return { ...prevData, gejalaData: updatedGejalaData };
    });
  };

  const fetchGejalaData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/gejala`);
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
      const response = await fetch(`${baseURl}/api/hapen`);
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

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;

    if (name.startsWith("id_gejala")) {
      const updatedGejalaData = [...formData.gejalaData];
      updatedGejalaData[index].id_gejala = value;
      const selectedGejala = gejalaList.find(
        (gejala) => gejala.id_gejala === value
      );
      updatedGejalaData[index].bobot = selectedGejala
        ? selectedGejala.default_bobot
        : "0";

      setFormData((prevData) => ({
        ...prevData,
        gejalaData: updatedGejalaData,
      }));
    } else if (name.startsWith("bobot")) {
      const updatedGejalaData = [...formData.gejalaData];
      updatedGejalaData[index].bobot = value;

      setFormData((prevData) => ({
        ...prevData,
        gejalaData: updatedGejalaData,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleTambahButtonClick = () => {
    if (!formData.id_hapen || !formData.gejalaData) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hapen dan Gejala harus diisi.",
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
        id_basiskasus: lastIdBk,
        id_hapen: "",
        gejalaData: [],
      });
      onCloseTambahModal();
    } catch (error) {
      console.error("Error menambah data:", error);
    }
  };

  useEffect(() => {
    console.log("data", formData);
    fetchData();
  }, []);

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
            <InputLabel htmlFor="id_hapen">Nama Hapen</InputLabel>
            <Select
              name="id_hapen"
              value={formData.id_hapen || ""}
              onChange={handleInputChange}
            >
              <MenuItem value="">--Pilih Hapen--</MenuItem>
              {hapenList.map((hapen) => (
                <MenuItem key={hapen.id_hapen} value={hapen.id_hapen}>
                  {hapen.id_hapen} {hapen.nama_hapen}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div id="gejala-container">
            {formData.gejalaData.map((gejala, index) => (
              <FormControl fullWidth margin="normal" key={index}>
                <InputLabel htmlFor={`id_gejala_${index}`}>
                  Nama Gejala
                </InputLabel>
                <Select
                  name={`id_gejala_${index}`}
                  value={gejala.id_gejala || ""}
                  onChange={(event) => handleInputChange(event, index)}
                >
                  <MenuItem value="">--Pilih Gejala--</MenuItem>
                  {gejalaList.map((gejala) => (
                    <MenuItem key={gejala.id_gejala} value={gejala.id_gejala}>
                      {gejala.id_gejala} {gejala.nama_gejala}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  name={`bobot_${index}`}
                  label="Bobot"
                  type="number"
                  value={gejala.bobot || ""}
                  onChange={(event) => handleInputChange(event, index)}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleRemoveGejala(index)}
                >
                  Hapus
                </Button>
              </FormControl>
            ))}
            <Button
              type="button"
              variant="contained"
              color="success"
              size="small"
              onClick={handleAddGejala}
            >
              Tambah
            </Button>
          </div>
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
          style={{ backgroundColor: "var(--gray)", color: "white" }}
        >
          Batal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTambahGejala;
