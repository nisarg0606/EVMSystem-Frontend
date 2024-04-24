import React, { useState, useEffect, useRef } from "react";
import { GoogleLogin } from "react-google-login";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import LoginApi from "../../utils/LoginApi.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReCAPTCHA } from "react-google-recaptcha";

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
  const [modal, setModal] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const toggle = () => setModal(!modal);

  const handleLogin = async () => {
    try {
      const response = await LoginApi({ email, password, code });
      if (response.message === "Invalid code") {
        setIs2FARequired(true);
        toast.error(error.message)
      } else {
        toast.success(response);
        window.location.href = "/";
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      toast.error(error.message + " invalid code")
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login successful", response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed", error);
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

  const handlePasswordReset = () => {
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
                     
                      <GoogleLogin
                        clientId="YOUR_GOOGLE_CLIENT_ID"
                        buttonText="Login with Google"
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                      />
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
                      onClick={toggle}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Link className="text-light" to="/register">
                      <small>Create new account</small>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
      <ToastContainer />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reset Password</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="emil"
                id="email"
                value={resetPasswordEmail}
                onChange={(e) => setResetPasswordEmail(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="tw-text-black" onClick={handlePasswordReset}>
            Reset Password
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <ReCAPTCHA
        sitekey="YOUR_RECAPTCHA_SITE_KEY"
        onChange={handleRecaptchaChange}
      />
    </>
  );
};

export default Login;
