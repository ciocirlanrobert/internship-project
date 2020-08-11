import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Banner from "../images/banner.jpg";
import jobImage from "../images/welcomeJob.jpg";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage: `url(${Banner})`,
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
  welcomeJobs: {
    display: "flex",
    width: "100%",
    margin: "100px 0",
    padding: "30px",
  },
  welcomeJobsText: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },

  welcomeJobsMedia: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
  },

  jobsImageContainer: {
    width: "100%",
  },

  welcomeJobTitle: {
    padding: "15px 0",
  },

  welcomeJobParagraph: {
    lineHeight: "1.7",
  },

  welcomeJobButton: {
    margin: "5% 2%",
    borderRadius: "25px",
    padding: "10px",
  },
}));

export default function WelcomePage() {
  const style = useStyles();
  const history = useHistory();

  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <React.Fragment>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRegister}
                >
                  Register now!
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className={style.welcomeJobs}>
        <Container className={style.welcomeJobsText} maxWidth="sm">
          <Typography
            component="h2"
            variant="h3"
            align="left"
            className={style.welcomeJobTitle}
          >
            Lorem Ipsum
          </Typography>
          <Typography
            variant="h6"
            align="left"
            color="textSecondary"
            paragraph
            className={style.welcomeJobParagraph}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            tincidunt lorem leo, et rhoncus massa aliquam vel. Quisque a metus
            interdum, vulputate ligula ut, gravida velit. Aenean elit metus,
            tempus sed tortor a, condimentum congue felis.
          </Typography>
        </Container>
        <Container className={style.welcomeJobsMedia} maxWidth="sm">
          <div className={style.jobsImageContainer}>
            <img src={jobImage} alt="" className="responsiveImage" />
          </div>
          <Button
            variant="contained"
            color="primary"
            className={style.welcomeJobButton}
          >
            See the jobs
          </Button>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
}
