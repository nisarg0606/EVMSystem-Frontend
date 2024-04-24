import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/login", {
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
      <section className="section section-lg section-shaped">
        <Container className="py-md">
          <Row className="row-grid justify-content-between align-items-center">
            <Col lg="6">
              {/* Your existing content */}
            </Col>
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
                        onClick={handleSubmit} // Call handleSubmit on button click
                      >
                        Sign in
                      </Button>
                    </div>
                  </Form>
                  {error && (
                    <div className="text-center text-danger mt-3">{error}</div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
