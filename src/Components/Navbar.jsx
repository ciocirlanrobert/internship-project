import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useUserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "white",
    color: "black",
    minHeight: "10vh",
    display: "flex",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontFamily: "'Anton', sans-serif;",
    fontSize: "30px",
    letterSpacing: "3px",
    color: "#08151e",
  },
}));

export default function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  const { user } = useUserContext();

  const handleClick = () => {
    if (user.userRoleId === 2) {
      history.push("/company");
    } else {
      history.push("/admin");
    }
  };

  const handleMyAccount = () => {
    user.username ? history.push("/myProfile") : history.push("/login");
  };

  const handleApplications = () => {
    history.push("/applications");
  };

  const handleCompanyApplications = () => {
    history.push("/applicants");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <h3></h3>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            RoJ Hiring
          </Typography>
          {user.userRoleId === 2 && (
            <Button color="inherit" onClick={handleCompanyApplications}>
              Job Applicants
            </Button>
          )}
          {user.userRoleId === 1 && (
            <Button color="inherit" onClick={handleApplications}>
              My applications
            </Button>
          )}
          {user.userRoleId > 1 && (
            <Button color="inherit" onClick={handleClick}>
              Dashboard
            </Button>
          )}
          <Button color="inherit" onClick={handleMyAccount}>
            {user.username ? "My Profile" : "Log in"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
