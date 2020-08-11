import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paddingSwitch: {
    padding: "10px 30px",
  },

  marginLink: {
    margin: "20px 10px",
  },

  buttonsContainer: {
    margin: "30px",
  },
});

export default function LoginRegisterSwitchers() {
  const style = useStyles();

  return (
    <div className={style.buttonsContainer}>
      <Link to="/login" className={style.marginLink}>
        <Button
          className={style.paddingSwitch}
          type="submit"
          color="primary"
          variant="contained"
        >
          Login
        </Button>
      </Link>
      <Link to="/register" className={style.margin}>
        <Button
          className={style.paddingSwitch}
          type="submit"
          color="primary"
          variant="contained"
        >
          Register
        </Button>
      </Link>
    </div>
  );
}
