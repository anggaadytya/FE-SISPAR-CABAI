import { useEffect, useState } from "react";
import SideBar from "../../../components/sidebar/SideBar";
import TableAll from "../../../components/TableGejala/TableAll";
import ModalComponent from "../../../components/ModalTest/ModalTest";
import ModalTambahGejala from "../../../components/ModalTambahGejala/ModalTambahGejala";
import Swal from "sweetalert2";
import axios from "axios";
import "./Gejala.css";


const Gejala = () => {
  const [getDataGejala, setGetDataGejala] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openTambahModal, setOpenTambahModal] = useState(false);
  const [lastIdGejala, setLastIdGejala] = useState("");

  useEffect(() => {
    ambilDataGejala();
  }, []);

  const ambilDataGejala = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/gejala`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setGetDataGejala(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditData = async (editedData) => {
    const id_gejala = editedData.id_gejala;
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/gejala/${id_gejala}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      ambilDataGejala();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data gejala berhasil diperbarui",
        confirmButtonColor: "chocolate",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteData = async (deletedData) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/gejala/${deletedData.id_gejala}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        ambilDataGejala();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data gejala berhasil dihapus",
          confirmButtonColor: "chocolate",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error,
          confirmButtonColor: "chocolate",
        });
      } else {
        console.error("Error deleting data:", error);
      }
    }
  };

  const handleTambahData = async (formData) => {
    try {
      const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/gejala`,
        formData
      );
      const newIdGejala = response.data.id_gejala;
      setLastIdGejala(newIdGejala);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Data gejala berhasil ditambahkan",
        confirmButtonColor: "chocolate",
      });
      ambilDataGejala();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleInfoButtonClick = (data) => {
    setSelectedData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenTambahModal = () => {
    setOpenTambahModal(true);
  };

  const handleCloseTambahModal = () => {
    setOpenTambahModal(false);
  };

  return (
    <div className="AppMain">
      <div className="AppGlass">
        <SideBar id={1} />
        <div className="MainDashGejala">
          <h1>Data Gejala</h1>
          <button className="tambah-gejala" onClick={handleOpenTambahModal}>
            Tambah Data Gejala
          </button>
          <TableAll
            getDataGejalaAll={getDataGejala}
            onInfoButtonClick={handleInfoButtonClick}
            handleDeleteButtonClick={handleDeleteData}
          />
          <ModalComponent
            openModal={openModal}
            selectedData={selectedData}
            onCloseModal={handleCloseModal}
            onEditData={handleEditData}
          />

          <ModalTambahGejala
            openTambahModal={openTambahModal}
            onCloseTambahModal={handleCloseTambahModal}
            onTambahData={handleTambahData}
            lastIdGejala={lastIdGejala}
          />
        </div>
      </div>
    </div>
  );
};

export default Gejala;
