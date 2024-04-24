import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar";
import SimpleFooter from "components/Footers/SimpleFooter";
import GetUserProfile from "../../utils/Profile/GetUserProfile";
import UpdateUserProfile from "../../utils/Profile/UpdateUserProfile";
import GetQRcode from "../../utils/GetQRcode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fun2fa from "../../utils/fun2fa";
import Disable2fa from "../../utils/Disable2fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [is2FAPopupOpen, setIs2FAPopupOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [interests, setInterests] = useState("");
  const [allInterests] = useState(["Music", "Sports", "Travel"]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await GetUserProfile();
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
  const { name, value } = event.target;

  if (name === "firstName") {
    setFirstName(value);
  } else if (name === "lastName") {
    setLastName(value);
  } else if (name === "interests") {
    // Update interests state with a list of interests
    setInterests(value);
  }
};

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const updateProfile = async () => {
    const updatedProfileData = {
      firstName: firstName,
      lastName: lastName,
      // Use the interests state directly without splitting it into an array
      interestedIn: interests,
    };
  
    try {
      await UpdateUserProfile(updatedProfileData);
      toggleUpdateModal();
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };
  const enable2FA = () => {
    toggle2FAPopup();
  };

  const disable2FA = async () => {
    try {
      await Disable2fa(true);
      console.log("2FA disabled successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error disabling 2FA:", error.message);
    }
  };

  const toggleUpdateModal = () => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggle2FAPopup = () => {
    setIs2FAPopupOpen(!is2FAPopupOpen);

    if (!is2FAPopupOpen) {
      GetQRcode()
        .then((data) => {
          setQrCodeData(data);
        })
        .catch((error) => {
          console.error("Error fetching QR code:", error);
        });
    }
  };

  const handle2FASubmit = async (code) => {
    try {
      const response = await fun2fa(code);
      if (response && response.error) {
        setErrorMessage(response.error);
        setSuccessMessage("");
      } else {
        setSuccessMessage(response.message);
        setErrorMessage("");
      }
      window.location.reload();
    } catch (error) {
      setErrorMessage("Failed to enable 2FA. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <DemoNavbar />
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300 relative">
              <div className="tw-d-flex tw-justify-content-between tw-align-items-center tw-mb-3">
                <Button
                  className="tw-absolute tw-top-0 tw-right-0 mt-3 mr-3 tw-bg-blue-500 tw-text-white px-4 py-2 rounded-lg"
                  onClick={toggleUpdateModal}
                >
                  Update Profile
                </Button>
                {user?.twoFactorAuthEnabled ? (
                  <Button
                    className="tw-absolute ml-3 tw-top-0 mt-3 mr-3 tw-bg-red-500 tw-text-white px-4 py-2 rounded-lg"
                    onClick={disable2FA}
                  >
                    Disable 2FA
                  </Button>
                ) : (
                  <Button
                    className="tw-absolute ml-3 tw-top-0 mt-3 mr-3 tw-bg-green-500 tw-text-white px-4 py-2 rounded-lg"
                    onClick={enable2FA}
                  >
                    Enable 2FA
                  </Button>
                )}
              </div>
              <div className="px-4">

                <Card className="mt-5 p-4 tw-border-blue-500 tw-border-opacity-100">
                  <div className="text-center ">
                    <br></br>
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/profile1.png")}
                            />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {loading ? (
                      <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
                    ) : (
                      <>
                        {user?.verified ? (
                          <span className="tw-text-green-500 tw-text-sm text-bold">
                            Verified
                          </span>
                        ) : (
                          <span className="tw-text-red-500 tw-text-sm">
                            Not Verified
                          </span>
                        )}
                          <div>
                            <h3>{`${user.firstName} ${user.lastName}`}</h3>
                          </div>
                        <h3>{user?.username}</h3>
                        <p>Email: {user?.email}</p>
                        <p>Role: {user?.role}</p>
                        {user?.interestedIn?.length > 0 && (
                          <div className="mt-3 tw-text-sm">
                            <h5>Interests:</h5>
                            <ul>
                              {user?.interestedIn.map((interest, index) => (
                                <li key={index}>{interest}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Card>
                <br></br>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
      {/* Update Profile Modal */}
      <Modal isOpen={isUpdateModalOpen} toggle={toggleUpdateModal}>
        <ModalHeader toggle={toggleUpdateModal}>
          Update Profile
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="interests">Interests</Label>
            <Input
              type="text"
              name="interests"
              id="interests"
              value={interests}  
              onChange={handleInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={updateProfile}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggleUpdateModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* 2FA Popup */}
      <Modal isOpen={is2FAPopupOpen} toggle={toggle2FAPopup}>
        <ModalHeader toggle={toggle2FAPopup}>Enable 2FA</ModalHeader>
        <ModalBody>
          {qrCodeData && (
            <div className="tw-flex tw-justify-center tw-items-center">
              <img src={qrCodeData.qrCode} alt="QR Code" />
            </div>
          )}
          {/* Error message */}
          {errorMessage && (
            <div className="tw-text-red-500 tw-text-center">{errorMessage}
              <br></br>
              <br></br>
            </div>
          )}
          {/* Success message */}
          {successMessage && (
            <div className="tw-text-green-500 tw-text-center">
              {successMessage}
              <br></br>
              <br></br>
            </div>
          )}
          {/* Input field for 2FA code */}
          <FormGroup>
            <Label for="2faCode">Enter 2FA Code</Label>
            <Input type="text" name="2faCode" id="2faCode" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="tw-text-black"
            onClick={() => handle2FASubmit(document.getElementById('2faCode').value)}
          >
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle2FAPopup}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}


export default Profile;
