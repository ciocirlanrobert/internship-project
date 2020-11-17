import React from 'react'
import JobsContainer from './JobsContainer'
import Navbar from '../../Components/Navbar/Navbar'
import {
    EventSeatOutlined,
    LocalDrinkOutlined,
    LocationOnOutlined,
    BeenhereOutlined,
    CastForEducationOutlined,
    SupervisorAccountOutlined,
} from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Banner from '../../images/landingBanner.svg'
import './style/style.css'

export default function LandingPage() {
    return (
        <Container className="root" maxWidth="lg">
            <Navbar />
            <div className="headerContainer">
                <div className="leftContainer">
                    <h1 className="title">
                        Join Our Team At <span className="orange">Roj</span>
                    </h1>
                    <p className="description">
                        Work at the most dynamic and successful agency
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        data-path="/login"
                        size="large"
                        style={{ backgroundColor: '#EF6C35' }}
                    >
                        View Openings
                    </Button>
                </div>
                <div className="rightContainer">
                    <img src={Banner} alt="Banner" />
                </div>
            </div>
            <div className="aboutContainer">
                <div className="aboutContainer__left">
                    <div className="aboutColumnLeft">
                        <div className="aboutBox">
                            <EventSeatOutlined
                                fontSize="large"
                                style={{ color: '#ef6c35' }}
                            />
                            <h3 className="aboutBox__title">
                                Large Beautiful Office
                            </h3>
                            <p className="aboutBox__description">
                                Enjoy a comfortable office environment with the
                                most modern and stylish furnishing.
                            </p>
                        </div>
                        <div className="aboutBox">
                            <LocationOnOutlined
                                fontSize="large"
                                style={{ color: '#ef6c35' }}
                            />
                            <h3 className="aboutBox__title">Easy Location</h3>
                            <p className="aboutBox__description">
                                Commute easily to work at your convenience and
                                enjoy compensation to transport costs.
                            </p>
                        </div>
                        <div className="aboutBox">
                            <LocalDrinkOutlined
                                fontSize="large"
                                style={{ color: '#ef6c35' }}
                            />
                            <h3 className="aboutBox__title">
                                Free Launch &amp; Snacks
                            </h3>
                            <p className="aboutBox__description">
                                Enjoy free delicious meals prepared by our
                                trusted vendors for lunch and for snacks.
                            </p>
                        </div>
                    </div>
                    <div className="aboutColumnRight">
                        <div className="aboutBox">
                            <SupervisorAccountOutlined
                                fontSize="large"
                                style={{ color: '#ef6c35' }}
                            />
                            <h3 className="aboutBox__title">
                                Great Co-Workers
                            </h3>
                            <p className="aboutBox__description">
                                Work with some of the best talent in the
                                industry and build strong networks with them.
                            </p>
                        </div>
                        <div className="aboutBox">
                            <CastForEducationOutlined
                                fontSize="large"
                                style={{ color: '#ef6c35' }}
                            />
                            <h3 className="aboutBox__title">
                                Education Opportunity
                            </h3>
                            <p className="aboutBox__description">
                                Get resources for developing your skills and
                                knowledge to kickstart your career.
                            </p>
                        </div>
                        <div className="aboutBox">
                            <BeenhereOutlined
                                fontSize="large"
                                style={{ color: '#ef6c35' }}
                            />
                            <h3 className="aboutBox__title">
                                Performance Award
                            </h3>
                            <p className="aboutBox__description">
                                Get awarded for better performance every 6
                                months and be recognized for your work.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="aboutContainer__right">
                    <h1 className="aboutContainer__right__title">
                        Your Life at <span className="orange">RoJ</span>
                    </h1>
                    <p className="aboutContainer__right__description">
                        At RoJ we believe in working together and working hard.
                        With over 800,000 happy clients, we are loking for
                        dynamic and creative individuals who are willing to
                        dedicate themselves to providing innovative products and
                        services for our clients.
                    </p>
                    <p className="aboutContainer__right__description">
                        Besides getting the opportunity to unlock your true
                        potential, at RoJ you can also network with some of the
                        most talented people in the industry, go on annual
                        picnics outside the country and enjoy many other
                        benefits by working with us.
                    </p>
                    <Button
                        className="aboutContainer__right__button"
                        variant="contained"
                        color="primary"
                        data-path="/login"
                        size="large"
                        style={{ backgroundColor: '#EF6C35' }}
                    >
                        Learn More
                    </Button>
                </div>
            </div>
            <h1 className="jobSectionTitle">
                Are you ready to <span className="orange">join our team?</span>
            </h1>
            <JobsContainer />
        </Container>
    )
}
