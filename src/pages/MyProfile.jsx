import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { useUserContext } from "../context/UserContext";
import Container from "@material-ui/core/Container";
import GeneralInfo from "../Components/GeneralInfo";
import CV from "./CV/CV";
import Footer from "../Components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },

  hero: {
    backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "45vh",
  },

  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  userName: {
    margin: "10px 0 5px 0",
  },

  email: {
    fontSize: "1em",
    fontWeight: "300",
    marginBottom: "50px",
  },
  menuButton: {
    margin: "10px 15px",
  },
  heroNavbar: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  mainInfo: {
    backgroundColor: "white",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginBottom: "40px",
  },
}));

export default function MyProfile() {
  const style = useStyles();
  const history = useHistory();
  const { user } = useUserContext();

  return (
    <div className={style.root}>
      <div className={style.hero}>
        <div className={style.heroNavbar}>
          <IconButton
            edge="start"
            className={style.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push("/landingPage");
            }}
          >
            <HomeIcon />
          </IconButton>
        </div>
        <div className={style.heroContent}>
          <div className={style.heroAvatar}>
            <Avatar
              alt="User"
              src="/static/images/avatar/1.jpg"
              className={style.large}
            />
          </div>
          <h1 className={style.userName}>
            {user.firstName + " " + user.lastName}
          </h1>
          <h3 className={style.email}>ciocirlan.r@mail.com</h3>
        </div>
      </div>
      <Container maxWidth="md" className={style.mainInfo} component="main">
        <GeneralInfo />
      </Container>
      <CV />
      <Footer />
    </div>
  );
}
