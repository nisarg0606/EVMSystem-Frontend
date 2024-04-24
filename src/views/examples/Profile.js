import React from "react";
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
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import GetUserProfile from "../../utils/Profile/GetUserProfile.js";
import UpdateUserProfile from "../../utils/Profile/UpdateUserProfile.js";
import GetQRcode from "../../utils/GetQRcode.js"; // Import the function to fetch QR code
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fun2fa from "../../utils/fun2fa.js";
import Disable2fa from "../../utils/Disable2fa.js";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
      isUpdateModalOpen: false,
      is2FAPopupOpen: false,
      firstName: "",
      lastName: "",
      interests: [],
      allInterests: ["Music", "Sports", "Travel"],
      qrCodeData: null, 
      errorMessage: "", 
      successMessage: "", 
    };
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
    this.toggle2FAPopup = this.toggle2FAPopup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleInterest = this.toggleInterest.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.enable2FA = this.enable2FA.bind(this);
    this.handle2FASubmit = this.handle2FASubmit.bind(this);
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  async handle2FASubmit(code) {
    try {
      const response = await fun2fa(code); 
console.log(code)
      if (response && response.error) {
        this.setState({ errorMessage: response.error, successMessage: "" });
      } else {
        this.setState({ successMessage: response.message, errorMessage: "" });
      }
      window.location.reload();
    } catch (error) {
      this.setState({
        errorMessage: "Failed to enable 2FA. Please try again later.",
        successMessage: ""
      });
    }
  }
  

  fetchUserProfile() {
    GetUserProfile()
      .then((data) => {
        this.setState({ user: data.user, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  toggleUpdateModal() {
    this.setState((prevState) => ({
      isUpdateModalOpen: !prevState.isUpdateModalOpen,
    }));
  }

  toggle2FAPopup() {
    this.setState((prevState) => ({
      is2FAPopupOpen: !prevState.is2FAPopupOpen,
    }));

    if (!this.state.is2FAPopupOpen) {
      GetQRcode()
        .then((data) => {
          this.setState({ qrCodeData: data });
        })
        .catch((error) => {
          console.error("Error fetching QR code:", error);
        });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  toggleInterest(interest) {
    const { interests } = this.state;
    const index = interests.indexOf(interest);
    if (index === -1) {
      this.setState((prevState) => ({
        interests: [...prevState.interests, interest],
      }));
    } else {
      this.setState((prevState) => ({
        interests: prevState.interests.filter((item) => item !== interest),
      }));
    }
  }

  updateProfile() {
    const { firstName, lastName, interests } = this.state;
    const updatedProfileData = {
      firstName: firstName,
      lastName: lastName,
      interestedIn: interests,
    };

    UpdateUserProfile(updatedProfileData)
      .then((data) => {
        this.toggleUpdateModal();
        this.fetchUserProfile();
      })
      .catch((error) => {
        console.error("Error updating user profile:", error.message);
      });
  }

  enable2FA() {
    this.toggle2FAPopup();
  }

  async disable2FA() {
    try {
      await Disable2fa(true); 
      console.log("2FA disabled successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error disabling 2FA:", error.message);
    }
  }


  render() {
    const {
      user,
      loading,
      error,
      isUpdateModalOpen,
      is2FAPopupOpen,
      firstName,
      lastName,
      interests,
      allInterests,
      qrCodeData,
      errorMessage,
      successMessage,
    } = this.state;

    if (loading) {
      return (
        <div className="tw-text-center">
          <p>Loading...</p>
          <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      );
    }

    if (error) {
      return <div>Error: {error}</div>;
    }
    const firstNameExists =
      user.hasOwnProperty("firstName") && user.firstName !== "";
    const lastNameExists =
      user.hasOwnProperty("lastName") && user.lastName !== "";

    return (
      <>
        <DemoNavbar />
        <main className="profile-page" ref="main">
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
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300 relative">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button
                    className="tw-absolute tw-top-0 tw-right-0 mt-3 mr-3 tw-bg-blue-500 tw-text-white px-4 py-2 rounded-lg"
                    onClick={this.toggleUpdateModal}
                  >
                    Update Profile
                  </Button>
                  {user.twoFactorAuthEnabled ? (
                  <Button
                    className="tw-absolute ml-3 tw-top-0 mt-3 mr-3 tw-bg-red-500 tw-text-white px-4 py-2 rounded-lg"
                    onClick={this.disable2FA}
                  >
                    Disable 2FA
                  </Button>
                ) : (
                  <Button
                    className="tw-absolute ml-3 tw-top-0 mt-3 mr-3 tw-bg-green-500 tw-text-white px-4 py-2 rounded-lg"
                    onClick={this.enable2FA}
                  >
                    Enable 2FA
                  </Button>
                )}
                </div>
                <div className="px-4">
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
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Card className="mt-5 p-4 tw-border-blue-500 tw-border-opacity-100">
                    <div className="text-center ">
                      {user.verified ? (
                        <span className="tw-text-green-500 tw-text-sm text-bold">
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-500 text-sm">
                          Not Verified
                        </span>
                      )}
                      {firstNameExists && lastNameExists && (
                        <div>
                          <h3 className="inline-block">{`${user.firstName} ${user.lastName}`}</h3>
                        </div>
                      )}
                      <h3>{user.username}</h3>

                      <p>Email: {user.email}</p>
                      <p>Role: {user.role}</p>

                      {user.interestedIn.length > 0 && (
                        <div className="mt-3 tw-text-sm">
                          <h5 className=" ">Interests:</h5>
                          <ul className="">
                            {user.interestedIn.map((interest, index) => (
                              <li key={index}>{interest}</li>
                            ))}
                          </ul>
                        </div>
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
        <Modal isOpen={isUpdateModalOpen} toggle={this.toggleUpdateModal}>
          <ModalHeader toggle={this.toggleUpdateModal}>
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
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Interests</Label>
              {allInterests.map((interest, index) => (
                <FormGroup check key={index}>
                  <Label check>
                    <Input
                      type="checkbox"
                      name={interest}
                      checked={interests.includes(interest)}
                      onChange={() => this.toggleInterest(interest)}
                    />{" "}
                    {interest}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.updateProfile}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleUpdateModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* 2FA Popup */}
        <Modal isOpen={is2FAPopupOpen} toggle={this.toggle2FAPopup}>
          <ModalHeader toggle={this.toggle2FAPopup}>Enable 2FA</ModalHeader>
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
              onClick={() => this.handle2FASubmit(document.getElementById('2faCode').value)}
            >
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle2FAPopup}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Profile;
