import { useEffect, useState } from "react";
import SideBar from "../../../components/sidebar/SideBar";
import TableBasisKasus from "../../../components/TableBasisKasus/TableBasisKasus";
import ModalComponent from "../../../components/ModalDetailBasisKasus/ModalDetailBasisKasus";
import ModalTambahBk from "../../../components/ModalTambahBasisKasus/ModalTambahBk";
import Swal from "sweetalert2";
import axios from "axios";
import "./BasisKasus.css";
import { baseURl } from "../../../../constan";

const BasisKasus = () => {
  const [getDataBk, setGetDataBk] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openTambahModal, setOpenTambahModal] = useState(false);
  const [lastIdBk, setLastIdBk] = useState("");

  useEffect(() => {
    ambilDataBk();
  }, []);

  const ambilDataBk = async () => {
    try {
      const response = await fetch(`${baseURl}/api/basiskasus`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setGetDataBk(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditData = async (editedData) => {
    try {
      const response = await fetch(
        `${baseURl}/api/basiskasus/${editedData.id_basiskasus}`,
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
      ambilDataBk();
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
        `${baseURl}/api/basiskasus/${deletedData.id_basiskasus}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        ambilDataBk();
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
        `${baseURl}/api/basiskasus`,
        formData
      );
      const newIdBk = response.data.id_basiskasus;
      setLastIdBk(newIdBk);

      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "basis Kasus berhasil ditambahkan",
        confirmButtonColor: "chocolate",
      });
      ambilDataBk();
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
        <SideBar id={3} />
        <div className="MainDashBk">
          <h1>Data Basis Kasus</h1>
          <button className="tambah-basiskasus" onClick={handleOpenTambahModal}>
            Tambah Data Kasus
          </button>
          <TableBasisKasus
            relasiData={getDataBk}
            getDataBkAll={getDataBk}
            onInfoButtonClick={handleInfoButtonClick}
            handleDeleteButtonClick={handleDeleteData}
          />
          <ModalComponent
            openModal={openModal}
            selectedData={selectedData}
            onCloseModal={handleCloseModal}
            onEditData={handleEditData}
          />

          <ModalTambahBk
            openTambahModal={openTambahModal}
            onCloseTambahModal={handleCloseTambahModal}
            onTambahData={handleTambahData}
            lastIdBk={lastIdBk}
          />
        </div>
      </div>
    </div>
  );
};

export default BasisKasus;
