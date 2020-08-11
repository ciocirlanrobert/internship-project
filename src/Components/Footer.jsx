import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    display: "flex",
    minHeight: "15vh",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#08151e",
    color: "white",
  },

  footerText: {
    paddingLeft: "10px",
    width: "50%",
  },

  footerSocials: {
    width: "50%",
    display: "flex",
    justifyContent: "space-evenly",
  },

  socialLink: {
    textDecoration: "none",
    color: "inherit",
    transition: "all .1s ease-in-out",
    "&:hover": {
      color: "gray",
    },
  },
});

export default function Footer() {
  const style = useStyles();
  return (
    <div className={style.footer}>
      <div className={style.footerText}>
        <Typography>Copyright &copy; RoJ 2020</Typography>
      </div>
      <div className={style.footerSocials}>
        <a href="#" className={style.socialLink}>
          <FacebookIcon />
        </a>
        <a href="#" className={style.socialLink}>
          <GitHubIcon />
        </a>
        <a href="#" className={style.socialLink}>
          <LinkedInIcon />
        </a>
        <a href="#" className={style.socialLink}>
          <InstagramIcon />
        </a>
      </div>
    </div>
  );
}
