import Navbar from "../../../components/NavBar/Navbar";
import CardInfo from "../../../components/CardInfo/CardInfo";
import "./Informasi.css";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { baseURl } from "../../../../constan";

const Informasi = () => {
  const [getDataHapen, setGetDataHapen] = useState([]);

  useEffect(() => {
    ambilDataHapen();
  }, []);

  const ambilDataHapen = async () => {
    try {
      const response = await fetch(`${baseURl}/api/hapen`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setGetDataHapen(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="informasi">
      <Navbar />
      <header className="pt-5 d-flex">
        <Container>
          <Row className="header-box d-flex">
            <Col>
              <h3 className="fw-bold">
                Informasi <br /> <span> Hama dan Penyakit</span> Tanaman Cabai
              </h3>
              <div className="informasi-wrapper-scroll-y informasi-custom-scrollbar">
                {getDataHapen.map((data) => {
                  return (
                    <div className="mb-3" key={data.id_hapen}>
                      <CardInfo
                        title={data.nama_hapen}
                        detail={data.detail}
                        solusi={data.solusi}
                      />
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default Informasi;
