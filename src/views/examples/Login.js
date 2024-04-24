import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import LoginApi from "../../utils/LoginApi.js";

const Login = () => {
  const mainRef = useRef(null);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainRef.current.scrollTop = 0;
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(""); 
  const [is2FARequired, setIs2FARequired] = useState(false); 
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      console.log("login")
      const response = await LoginApi({ email, password });
      console.log(response)
      if (response.message === "Two factor authentication required") {
        setIs2FARequired(true);
      } else {
        // Successful login, redirect to home
        console.log("Login successful:", response);
        window.location.href = "/";
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handle2FASubmit = async () => {
    try {
      const response = await LoginApi({ email, password, code });
      console.log("2FA successful:", response);
      window.location.href = "/";
    } catch (error) {
      setError("2FA submission failed. Please check your code.");
    }
  };

  return (
    <>
      <DemoNavbar />
      <main ref={mainRef}>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            {[...Array(8)].map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Sign in with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/github.svg").default}
                          />
                        </span>
                        <span className="btn-inner--text">Github</span>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon ml-1"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/google.svg").default}
                          />
                        </span>
                        <span className="btn-inner--text">Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Or sign in with credentials</small>
                    </div>
                    <Form>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      {/* Render the input for the 2FA code if 2FA is required */}
                      {is2FARequired && (
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-key-25" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Enter 2FA Code"
                              type="text"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                            />
                          </InputGroup>
                        </FormGroup>
                      )}
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckLogin"
                        >
                          <span>Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">
                        {is2FARequired ? (
                          <Button
                            className="my-4 tw-text-black"
                            color="primary"
                            type="button"
                            onClick={handle2FASubmit}
                          >
                            Submit 2FA Code
                          </Button>
                        ) : (
                          <Button
                            className="my-4 tw-text-black"
                            color="primary"
                            type="button"
                            onClick={handleLogin}
                          >
                            Sign in
                          </Button>
                        )}
                      </div>
                      {error && <div className="text-danger">{error}</div>}
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href="/register-page"
                      onClick={(e) => e.preventDefault()}
                    >
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Login;
