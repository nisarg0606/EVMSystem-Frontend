import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="tw-mx-auto tw-text-center" lg="10">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/63/Energieversorgung_Mittelrhein_Logo.svg"
                      alt="EVM-System Logo"
                      style={{ maxHeight: "50px", maxWidth: "150px" }} // Adjust the max height and width as needed
                      className="tw-mx-auto"
                    />
                    <br />
                    <h1 className="tw-text-xl lg:tw-text-2xl tw-font-serif tw-font-bold tw-text-center tw-text-gray-800 tw-my-4">EVENT VENUE MANAGEMENT SYSTEM</h1>
                    <p className="tw-text-center tw-text-white tw-text-lg">
                      <span className="tw-text-gradient">Your vision.</span>
                      <span className="tw-text-gradient">Our innovation:</span>
                      <span className="tw-text-gradient">EVM-System the total Event solutions..</span>
                      <span className="tw-text-gradient">Book You show today..!</span>
                    </p>



                  </Col>


                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
