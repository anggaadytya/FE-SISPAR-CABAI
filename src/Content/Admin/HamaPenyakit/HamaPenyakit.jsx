import { useEffect, useState } from "react";
import SideBar from "../../../components/sidebar/SideBar";
import TableHapen from "../../../components/TableHapen/TableHapen";
import ModalDetailHapen from "../../../components/ModalDetailHapen/ModalDetailHapen";
import ModalTambahHapen from "../../../components/ModalTambahHapen/ModalTambahHapen";
import Swal from "sweetalert2";
import axios from "axios";
import "./HamaPenyakit.css";


const HamaPenyakit = () => {
  const [getDataHapen, setGetDataHapen] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openTambahModal, setOpenTambahModal] = useState(false);
  const [lastIdHapen, setLastIdHapen] = useState("");

  useEffect(() => {
    ambilDataHapen();
  }, []);

  const ambilDataHapen = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/hapen`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setGetDataHapen(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditData = async (editedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/hapen/${editedData.id_hapen}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      ambilDataHapen();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data hapen berhasil diperbarui",
        confirmButtonColor: "chocolate",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteData = async (deletedData) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/hapen/${deletedData.id_hapen}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        ambilDataHapen();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data hapen berhasil dihapus",
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
        `${import.meta.env.VITE_BASE_URL}/api/hapen`,
        formData
      );
      const newIdHapen = response.data.id_hapen;
      setLastIdHapen(newIdHapen);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Data hapen berhasil ditambahkan",
        confirmButtonColor: "chocolate",
      });
      ambilDataHapen();
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
        <SideBar id={2} />
        <div className="MainDashHapen">
          <h1>Data Hama dan Penyakit</h1>
          <button className="tambah-hapen" onClick={handleOpenTambahModal}>
            Tambah Data Hapen
          </button>
          <TableHapen
            getDataHapenAll={getDataHapen}
            onInfoButtonClick={handleInfoButtonClick}
            handleDeleteButtonClick={handleDeleteData}
          />
          <ModalDetailHapen
            openModal={openModal}
            selectedData={selectedData}
            onCloseModal={handleCloseModal}
            onEditData={handleEditData}
          />

          <ModalTambahHapen
            openTambahModal={openTambahModal}
            onCloseTambahModal={handleCloseTambahModal}
            onTambahData={handleTambahData}
            lastIdHapen={lastIdHapen}
          />
        </div>
      </div>
    </div>
  );
};

export default HamaPenyakit;
