import React from "react";
import { Button, Card, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input ,Spinner } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import GetUserProfile from "../../utils/Profile/GetUserProfile.js";
import UpdateUserProfile from "../../utils/Profile/UpdateUserProfile.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
      isUpdateModalOpen: false,
      firstName: "",
      lastName: "",
      interests: [],
      allInterests: ["Music", "Sports", "Travel"]
    };
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleInterest = this.toggleInterest.bind(this);
    this.updateProfile = this.updateProfile.bind(this); 
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    GetUserProfile()
      .then(data => {
        this.setState({ user: data.user, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

  toggleUpdateModal() {
    this.setState(prevState => ({
      isUpdateModalOpen: !prevState.isUpdateModalOpen
    }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleInterest(interest) {
    const { interests } = this.state;
    const index = interests.indexOf(interest);
    if (index === -1) {
      this.setState(prevState => ({
        interests: [...prevState.interests, interest]
      }));
    } else {
      this.setState(prevState => ({
        interests: prevState.interests.filter(item => item !== interest)
      }));
    }
  }

  updateProfile() {
    const { firstName, lastName, interests } = this.state;
    const updatedProfileData = {
      firstName: firstName,
      lastName: lastName,
      interestedIn: interests
    };

    UpdateUserProfile(updatedProfileData)
      .then(data => {
        this.toggleUpdateModal();
        this.fetchUserProfile();
      })
      .catch(error => {
        console.error("Error updating user profile:", error.message);
      });
  }

  render() {
    const { user, loading, error, isUpdateModalOpen, firstName, lastName, interests, allInterests } = this.state;

    if (loading) {
      return (
        <div className="tw-text-center">
          <p>Loading...</p>
          <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    const firstNameExists = user.hasOwnProperty("firstName") && user.firstName !== "";
    const lastNameExists = user.hasOwnProperty("lastName") && user.lastName !== "";

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
          {loading ? (
            <div className="text-center">
              <p>Loading...</p>
              <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
            </div>
          ) : (
            <Container>
              <Card className="card-profile shadow mt--300 relative">
                <Button className="tw-absolute tw-top-0 tw-right-0 mt-3 mr-3 tw-bg-blue-500 tw-text-white px-4 py-2 rounded-lg" onClick={this.toggleUpdateModal}>Update Profile</Button>
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
                      <span className="text-red-500 text-sm">Not Verified</span>
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
          )}
          </section>
        </main>
        <SimpleFooter />
        {/* Update Profile Modal */}
        <Modal isOpen={isUpdateModalOpen} toggle={this.toggleUpdateModal}>
          <ModalHeader toggle={this.toggleUpdateModal}>Update Profile</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input type="text" name="firstName" id="firstName" value={firstName} onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input type="text" name="lastName" id="lastName" value={lastName} onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Interests</Label>
              {allInterests.map((interest, index) => (
                <FormGroup check key={index}>
                  <Label check>
                    <Input type="checkbox" name={interest} checked={interests.includes(interest)} onChange={() => this.toggleInterest(interest)} />{' '}
                    {interest}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.updateProfile}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggleUpdateModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Profile;
