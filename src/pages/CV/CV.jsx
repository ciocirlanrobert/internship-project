import React from "react";
import Container from "@material-ui/core/Container";
import Education from "./Education";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  mainInfo: {
    backgroundColor: "white",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginBottom: "40px",
  },
});

export default function CV() {
  const style = useStyle();
  return (
    <>
      <Container maxWidth="md" className={style.mainInfo} component="main">
        <Education />
      </Container>
    </>
  );
}
