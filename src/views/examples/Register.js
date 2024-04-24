import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col, Label } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import RegitserApi from "utils/RegisterApi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Prepare user data
      const userData = {
        username: username,
        email: email,
        password: password,
        isAdmin: isAdmin
      };

      // Call loginApi to register user
      const data = await RegitserApi(userData);
      console.log('User registered successfully:', data);
      window.location.href = "/page-login";
    } catch (error) {
      console.error('Error occurred during registration:', error);
      // Handle error condition as needed
    }
  };

  return (
    <>
      <DemoNavbar />
      <main>
        <section className="section section-shaped section-lg">
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
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Sign up with</small>
                    </div>
                    <div className="text-center">
                      {/* GitHub and Google buttons */}
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Or sign up with credentials</small>
                    </div>
                    <Form onSubmit={handleRegister}>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Password" type="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
                      {/* Admin checkbox */}
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />{' '}
                          Admin
                        </Label>
                      </FormGroup>
                      <div className="text-center">
                        <Button className="mt-4" color="primary" type="submit">
                          Create account
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Register;
