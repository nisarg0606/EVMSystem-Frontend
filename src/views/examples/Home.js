import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    Container,
    Spinner,
} from 'reactstrap';
import CardMain from 'components/CardMain/CardMain';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import GetAllActivities from '../../utils/GetAllActivites.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetMyActivities from '../../utils/MyActivities.js';
import GetUpCommingActivites from 'utils/getUpCommingActivities.js';
import HostDashboardView from 'components/HostDashboardView.js';
import CustomerDashboardView from 'components/CustomerDashboardView.js';

const Home = () => {
    const userType = localStorage.getItem('role')

    return (
        <>
            <DemoNavbar />
            <main className="profile-page">
                <section className="section-profile-cover section-shaped my-0">
                    {/* Circles background */}
                    <iframe src='https://my.spline.design/3dtextbluecopy-395969798f2e0f678112143bc75ac6e0/' frameborder='0' width='100%' height='100%'></iframe>

                    <div className="shape shape-style-1 shape-default alpha-4">
                        <span />
                        <span />
                        <span />
                        <span />

                    </div>

                    {/* SVG separator */}
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
                            {userType !== 'customer' && (
                                <HostDashboardView />
                            )}
                            {userType === 'customer' && (

                                <CustomerDashboardView />
                            )}

                    </Container>

                </section>
                <SimpleFooter />
                <ToastContainer />

            </main>
        </>
    );
};

export default Home;