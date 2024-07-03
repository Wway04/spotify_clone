import { Divider } from "antd";

import "./Footer.scss";
import { Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Row className="d-flex footer-links">
          <Col lg={10} md={12} xs={12}>
            <Row className="d-flex links-text">
              <Col xs={6} sm={4} lg={3} xl={3}>
                <ul className="d-flex flex-column">
                  <p>Company</p>
                  <a href="/">
                    <span>About</span>
                  </a>
                  <a href="/">
                    <span>Jobs</span>
                  </a>
                  <a href="/">
                    <span>For the Record</span>
                  </a>
                </ul>
              </Col>
              <Col xs={6} sm={4} lg={3} xl={3}>
                <ul className="d-flex flex-column">
                  <p>Company</p>
                  <a href="/">
                    <span>About</span>
                  </a>
                  <a href="/">
                    <span>Jobs</span>
                  </a>
                  <a href="/">
                    <span>For the Record</span>
                  </a>
                </ul>
              </Col>
              <Col xs={6} sm={4} lg={3} xl={3}>
                <ul className="d-flex flex-column">
                  <p>Company</p>
                  <a href="/">
                    <span>About</span>
                  </a>
                  <a href="/">
                    <span>Jobs</span>
                  </a>
                  <a href="/">
                    <span>For the Record</span>
                  </a>
                </ul>
              </Col>
              <Col xs={6} sm={4} lg={3} xl={3}>
                <ul className="d-flex flex-column">
                  <p>Company</p>
                  <a href="/">
                    <span>About</span>
                  </a>
                  <a href="/">
                    <span>Jobs</span>
                  </a>
                  <a href="/">
                    <span>For the Record</span>
                  </a>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col lg={2} md={12} xs={12} className="links-icon">
            <a href="#" className="link-icon">
              <i className="fa-brands fa-instagram" style={{ color: "#ffffff" }}></i>
            </a>
            <a href="#" className="link-icon">
              <i className="fa-brands fa-twitter" style={{ color: "#ffffff" }}></i>
            </a>
            <a href="#" className="link-icon">
              <i className="fa-brands fa-facebook" style={{ color: "#ffffff" }}></i>
            </a>
          </Col>
        </Row>
        <div className="footer-divider">
          <div className="footer-divider-inner">
            <Divider style={{ backgroundColor: "white" }} />
          </div>
        </div>
        <div className="country-copyright">© 2024 Spotify AB</div>
      </div>
    </footer>
  );
}

export default Footer;
