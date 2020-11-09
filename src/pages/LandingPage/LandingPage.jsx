import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Banner from '../../images/landingBanner.svg'
import './style/style.css'

export default function LandingPage() {
    return (
        <Container className="root" maxWidth="lg">
            <Navbar />
            <div className="container">
                <div className="leftContainer">
                    <h1 className="title">
                        Join Our Team At <span className="company">Roj</span>
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
        </Container>
    )
}
