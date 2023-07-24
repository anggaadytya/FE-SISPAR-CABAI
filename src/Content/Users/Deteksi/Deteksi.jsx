import Navbar from "./../../../components/NavBar/Navbar";
import bigImage from "./../../../assets/imageSide.png";
import "./Deteksi.css";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

const Deteksi = () => {
  const [getDataGejala, setGetDataGejala] = useState([]);
  const [kodeDeteksi, setKodeDeteksi] = useState("");
  const [selectedGejala, setSelectedGejala] = useState([]);

  useEffect(() => {
    ambilDataGejala();
    ambilIdDeteksi();
  }, [kodeDeteksi]);

  const ambilIdDeteksi = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/last-deteksi-number"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setKodeDeteksi(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const ambilDataGejala = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gejala");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setGetDataGejala(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGejalaChange = (idGejala) => {
    setSelectedGejala((prevSelected) => {
      if (prevSelected.includes(idGejala)) {
        return prevSelected.filter((id) => id !== idGejala);
      } else {
        return [...prevSelected, idGejala];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedGejala.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Silahkan pilih minimal satu gejala.",
        confirmButtonText: "OK",
        confirmButtonColor: "chocolate",
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/deteksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_deteksi: kodeDeteksi?.kodeDeteksi,
          gejala: selectedGejala,
        }),
      });

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mengirim data deteksi.");
      }

      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      setSelectedGejala([]);
      setKodeDeteksi("");

      Swal.fire({
        icon: "success",
        title: "Data Sudah Dikirimkan!",
        text: "Terima kasih atas partisipasinya",
        confirmButtonText: "OK",
        confirmButtonColor: "chocolate",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/hasil-deteksi/${kodeDeteksi?.kodeDeteksi}`;
        }
      });
    } catch (error) {
      console.error("Error sending data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat mengirim data deteksi.",
        confirmButtonText: "OK",
        confirmButtonColor: "chocolate",
      });
    }
  };

  return (
    <div className="deteksi">
      <Navbar />
      <header className="pt-5 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col>
              <h3 className="text-center fw-bold">
                Silahkan pilih gejala yang <br />
                <span>dialami tanaman Cabai anda</span>
              </h3>
              <InputGroup>
                <Form.Control  className="form1" value={kodeDeteksi.kodeDeteksi} />
              </InputGroup>
              <span className="form1">
                <span
                
                  style={{
                    color: "red",
                    marginRight: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  *
                </span>
                harap catat kode deteksi untuk cek hasil deteksi
              </span>
              <div className="deteksi-wrapper-scroll-y deteksi-my-custom-scrollbar mt-4 info">
                {getDataGejala.map((item) => {
                  return (
                    <div key={item.id_gejala}>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox
                          checked={selectedGejala.includes(item.id_gejala)}
                          onChange={() => handleGejalaChange(item.id_gejala)}
                        />
                        <Form.Control className="form1" value={item.nama_gejala} />
                      </InputGroup>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 d-flex align-items-center gap-4">
                <button
                  className="btn-submit rounded-2"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="btn-reset rounded-2"
                  type="reset"
                  onClick={() => setSelectedGejala([])}
                >
                  Reset
                </button>
              </div>
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

export default Deteksi;
