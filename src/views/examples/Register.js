import React, { useState } from "react";
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Container, Row, Col, Label } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import RegisterApi from "utils/RegisterApi.js";
import { Link } from 'react-router-dom';
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userData = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: isAdmin ? "venueOwner/eventPlanner" : "customer"
      };

      const Response = await RegisterApi(userData);
      if (Response) {
        setSuccess(true);
        console.log(Response.message);
      } else {
        alert("Registration successful. You can now login.");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
    setLoading(false);
  };

  {
    success && (
      <div className="text-success text-center">
        Registration successful. You can now <Link to="/page-login">login</Link>.
      </div>
    )
  }

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
            <iframe src='https://my.spline.design/3dtextbluecopy-395969798f2e0f678112143bc75ac6e0/' frameborder='0' width='100%' height='100%'></iframe>

          </div>          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form onSubmit={handleRegister}>
                      {/* First Name */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
                      {/* Last Name */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </InputGroup>
                      </FormGroup>
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
                      {/* Error message */}
                      {error && <div className="text-danger mb-3">{error}</div>}
                      <div className="text-center">
                        <Button
                          className="my-4 tw-text-black"
                          color="primary"
                          type="submit"
                          disabled={loading} // Disable button while loading
                        >
                          {loading ? "Creating account..." : "Create account"}
                        </Button>
                      </div>
                    </Form>
                    {/* Success message */}
                    {success && (
                      <div className="text-success text-center">
                        Registration successful. You can now <a href="/page-login">login</a>.
                      </div>
                    )}
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
