import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Banner from "../images/landingBanner.jpg";
import Jobs from "./Jobs";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: "black",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: theme.spacing(8, 0, 6),
    color: "white",
    height: "90vh",
  },
  heroContainer: {
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  jobsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    height: "100vh",
  },
}));

export default function LandingPage() {
  const style = useStyles();

  return (
    <>
      <Navbar />
      <div className={style.heroContent}>
        <Container maxWidth="sm" className={style.heroContainer}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
            gutterBottom
          >
            Lorem Ipsum
          </Typography>
          <Typography variant="h5" align="center" color="inherit" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            tincidunt lorem leo, et rhoncus massa aliquam vel. Quisque a metus
            interdum, vulputate ligula ut, gravida velit. Aenean elit metus,
            tempus sed tortor a, condimentum congue felis.
          </Typography>
          <div className={style.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  See jobs!
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className={style.jobsContainer}>
        <h1>Open jobs</h1>
        <Jobs />
      </div>
      <Footer />
    </>
  );
}
