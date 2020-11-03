import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Grow} from "@material-ui/core";
import Welcome1 from "../../images/Welcome1.jpg";
import Welcome2 from "../../images/Welcome2.jpg";
import Welcome3 from "../../images/Welcome3.jpg";

export default function WelcomePage() {

  const history = useHistory();
  const classes = useStyle();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
      <Container maxWidth="lg">
      <Navbar />
      <Grow in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 500 } : {})} >
        <div className={classes.container}>
          <div className={classes.leftContainer}>
            <div className={classes.leftTop}>
              <div className={classes.imageContainerTop}>
                <img src={Welcome1} alt="Job" className={classes.image}/>
              </div>
              <div className={classes.imageContainerTop}>
                <img src={Welcome2} alt="Job" className={classes.image}/>
              </div>
            </div>
            <div className={classes.leftBottom}>
              <div className={classes.imageContainerBottom}>
                <img src={Welcome3} alt="Job" className={classes.image}/>
              </div>
            </div>
          </div>
          <div className={classes.rightContainer}>
            <h1 className={classes.title}>
              Launch your career with RoJ
            </h1>
            <p className={classes.about}>
            We believe great business treat their employees like people, not ID numbers - and that starts right here in our offices.
            From hands-on training to our vibrant work environment and truly supportive community, RoJ is the best place to kickstart your career.
            </p>
            <Button variant="contained" color="primary">Apply Today</Button>
          </div>
        </div>
      </Grow>
      </Container>
  );
}


const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "90%",
    margin: "0 auto",
    padding: "35px"
  },
  leftContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },
  leftTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "3%"
  },
  leftBottom: {
    display: "flex",
    width: "100%",
  },
  imageContainerTop: {
    width: "47%",
  },
  imageContainerBottom: {
    width: "100%",
  },
  image: {
    display: "block",
    width: "100%",
  },
  rightContainer: {
    width: "50%",
    padding: "0 3%",
  },
  title: {
    width: "65%",
    fontSize: "50px",
    fontWeight: "700",
    marginBottom: "9%",
    letterSpacing: "2.5px",
    color: "#EF6C35",
    lineHeight: "1.2"
  },
  about: {
    fontWeight: 500,
    color: "gray",
    lineHeight: "1.6",
    marginBottom: "7%",
  }
}));