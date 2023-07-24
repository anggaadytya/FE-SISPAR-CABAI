import Navbar from "../../../components/NavBar/Navbar";
import bigImage from "./../../../assets/imageSide.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./About.css";

import { IconButton } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div className="about">
      <Navbar />
      <header className="pt-5 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col>
              <h1>
                Sistem Pakar Deteksi <br /> <span> Hama dan Penyakit</span>{" "}
                <br /> Tanaman Cabai
              </h1>
              <p>
                Sistem ini merupakan sistem pakar untuk mendeteksi hama dan
                penyakit tanaman cabai menggunakan metode case based reasoning.
                Yang bertujuan untuk memberikan informasi kepada petani tentang
                berbagai macam hama dan tanaman cabai yang dapat menyerang
                tanaman cabai mereka dan memberikan solusi terkait permasalahan
                hama dan penyakit yang dialami oleh petani.
              </p>
              <div className="d-flex justify-content-around ">
                <a href="https://github.com/anggaadytya">
                  <IconButton>
                    <GitHubIcon />
                  </IconButton>
                </a>
                <a href="https://www.linkedin.com/in/muhammad-angga-adytya-112b17228/">
                  <IconButton>
                    <LinkedInIcon />
                  </IconButton>
                </a>
                <a href="https://www.instagram.com/angga_adytya/?hl=id">
                  <IconButton>
                    <InstagramIcon />
                  </IconButton>
                </a>
              </div>
              <a
                href="https://wa.me/081265616130"
                className="btn-wa d-block"
              >
                Hubungi Kami
              </a>
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

export default About;
