import Navbar from "./../../../components/NavBar/Navbar";
import bigImage from "./../../../assets/imageSide.png";
import "./HasilDeteksi.css";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import Neighbors from "../../../components/Neighbor/Neighbor";
import { useReactToPrint } from "react-to-print";

const Deteksi = () => {
  const componentPDF = useRef();
  const [selectedDeteksi, setSelectedDeteksi] = useState({});
  const { idDeteksi } = useParams();
  const similarityPercentage =
    selectedDeteksi.similarity !== undefined
      ? (selectedDeteksi.similarity * 100).toFixed(0)
      : "";

  useEffect(() => {
    ambilDataDeteksi();
  }, []);

  const ambilDataDeteksi = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deteksi/${idDeteksi}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setSelectedDeteksi(jsonData[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Hasil Deteksi",
    onAfterPrint: () => alert("DATA saved in PDF"),
  });

  return (
    <div className="deteksi">
      <Navbar />
      <header className="pt-5 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col>
              <div ref={componentPDF} style={{ width: "100%" }}>
                <h3 className="text-center fw-bold">
                  Hasil Deteksi <br />
                  <span>tanaman Cabai anda</span>
                </h3>
                <span className="span">ID Deteksi :</span>
                <InputGroup>
                  <Form.Control
                    className="form1"
                    value={selectedDeteksi.id_deteksi}
                  />
                </InputGroup>
                <span className="span">Hasil Deteksi :</span>
                <InputGroup>
                  <Form.Control
                    className="form1"
                    value={selectedDeteksi.hasil}
                  />
                </InputGroup>
                <span className="span">Detail Penyakit :</span>
                <InputGroup>
                  {selectedDeteksi.detail ? (
                    <Form.Control
                      className="form1"
                      as="textarea"
                      value={selectedDeteksi.detail}
                      style={{
                        height: `${
                          selectedDeteksi.detail.split("\n").length * 2
                        }em`,
                      }}
                    />
                  ) : (
                    <Form.Control as="textarea" value="" />
                  )}
                </InputGroup>
                <span className="span">Solusi :</span>
                <InputGroup>
                  {selectedDeteksi.solusi ? (
                    <Form.Control
                      className="form1"
                      as="textarea"
                      value={selectedDeteksi.solusi}
                      style={{
                        height: `${
                          selectedDeteksi.solusi.split("\n").length * 2
                        }em`,
                      }}
                    />
                  ) : (
                    <Form.Control as="textarea" value="" />
                  )}
                </InputGroup>
                <span className="span">Hasil Perhitungan :</span>
                <InputGroup>
                  <Form.Control
                    className="form1"
                    value={
                      similarityPercentage !== ""
                        ? `${similarityPercentage}%`
                        : ""
                    }
                  />
                </InputGroup>
                <span className="span">Jenis :</span>
                <InputGroup>
                  <Form.Control
                    className="form1"
                    value={selectedDeteksi.jenis}
                  />
                </InputGroup>
                <Neighbors id_deteksi={idDeteksi} />
              </div>
              <div className="mt-4 d-flex align-items-center gap-4">
                <Link to="/" className="btn-reset rounded-2">
                  Back
                </Link>
                <button className="btn-submit rounded-2" onClick={generatePDF}>
                  PDF
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
