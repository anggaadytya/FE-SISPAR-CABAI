import { useEffect, useState } from "react";
import Navbar from "./../../../components/NavBar/Navbar";
import bigImage from "./../../../assets/imageSide.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Home.css";
import Swal from "sweetalert2";

import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [idDeteksi, setIdDeteksi] = useState("");

  useEffect(() => {
    setIdDeteksi("");
  }, []);

  const handleInputChange = (event) => {
    setIdDeteksi(event.target.value);
  };

  const handleCekDeteksi = async () => {
    if (idDeteksi.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost:5000/api/deteksi/${idDeteksi}`
        );
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Masukkan id_deteksi yang valid",
          });
        } else {
          navigate(`/hasil-deteksi/${idDeteksi}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Terjadi kesalahan saat mengambil data deteksi",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Masukkan id_deteksi yang valid",
      });
    }
  };
  return (
    <div className="Home">
      <Navbar />
      <header className="pt-5 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col>
              <h1>
                Sistem Pakar Deteksi <br /> <span> Hama dan Penyakit</span>{" "}
                <br /> Tanaman Cabai
              </h1>
              <p className="">
                Silahkan melakukan deteksi untuk mengetahui hama dan penyakit
                yang menyerang tanaman cabai anda
              </p>
              <p>cek hasil konsultasi anda dibawah</p>
              <div className="d-flex align-items-center">
                <div className="form-outline col-sm-5">
                  <input
                    type="text"
                    id="typeText"
                    className="form-control rounded-4"
                    value={idDeteksi}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="btn btn-color btn-md rounded-4 ms-2"
                  onClick={handleCekDeteksi}
                >
                  Cek
                </button>
              </div>
              <p>atau ajukan konsultasi</p>
              <button
                className="btn btn-color btn-md rounded-4"
                onClick={() => navigate("/deteksi")}
              >
                <ArrowForwardIosIcon />
                Disini
              </button>
            </Col>
            <Col>
              <img src={bigImage} alt="Hero Image" />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default HomePage;
