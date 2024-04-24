import DemoNavbar from "components/Navbars/DemoNavbar";
import React, { useState } from "react";
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
import { REACT_APP_BACKEND_URL } from "../../config";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      console.log("Backend URL:", REACT_APP_BACKEND_URL);
      const response = await fetch(`${REACT_APP_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please try again.");
      }

      const data = await response.json();

      // Handle successful login (e.g., store user data, redirect, etc.)
      console.log("Login successful:", data);

      // Reset form fields and error state
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      // Handle login error
      console.error("Login error:", error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <DemoNavbar />
      <main>
        <section className="section section-shaped section-lg">
          <iframe
            src="https://my.spline.design/3dtextbluecopy-395969798f2e0f678112143bc75ac6e0/"
            title="Spline Design"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>

          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-md">
            <Row className="row-grid justify-content-between align-items-center">
              <Col lg="6">{/* Your existing content */}</Col>
              <Col className="mb-lg-auto" lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    {/* Your existing content */}
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
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
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckLogin2"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckLogin2"
                        >
                          <span>Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          onClick={handleSubmit}
                        >
                          Sign in
                        </Button>
                      </div>
                    </Form>
                    {error && (
                      <div className="text-center text-danger mt-3">
                        {error}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Login;
