import Navbar from "./../../../components/NavBar/Navbar";
import "./HasilDeteksi.css";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import Neighbors from "../../../components/Neighbor/Neighbor";
import { useReactToPrint } from "react-to-print";
import { baseURl } from "../../../../constan";

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
      const response = await fetch(`${baseURl}/api/deteksi/${idDeteksi}`);
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
      <header className="d-flex align-items-center">
        <Container>
          <Row className="d-flex align-items-center">
            <Col>
              <div ref={componentPDF} style={{ width: "100%" }}>
                <h3 className="text-center fw-bold hasil">
                  Hasil Deteksi
                  <span className="textTitle">Tanaman Cabai Anda</span>
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
                    value={selectedDeteksi.nama_hapen}
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
                        textAlign: "justify",
                        height: `${
                          selectedDeteksi.detail.split(".").length * 1.2
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
                        textAlign: "justify",
                        height: `${
                          selectedDeteksi.solusi.split(".").length * 1
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
              <div className="buttonHasil d-flex align-items-center gap-4">
                <Link to="/" className="btn-submit-hasil rounded-2">
                  Back
                </Link>
                <button
                  className="btn-reset-hasil rounded-2"
                  onClick={generatePDF}
                >
                  PDF
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default Deteksi;
