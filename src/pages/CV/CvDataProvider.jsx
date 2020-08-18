import React from "react";
import Container from "@material-ui/core/Container";
import Education from "./Education";
import { makeStyles } from "@material-ui/core";
import { Educations } from "../../queries";
import { useUserContext } from "../../context/UserContext";
import { useQuery, useMutation } from "@apollo/client";

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

export default function CvDataProvider() {
  const style = useStyle();

  const { user } = useUserContext();

  const { data: queriedEducations } = useQuery(Educations, {
    variables: {
      id: user.id,
    },
  });

  const educations =
    (queriedEducations && queriedEducations.user.userEducations) || [];

  return (
    <Container maxWidth="md" className={style.mainInfo} component="main">
      <Education educations={educations} />
    </Container>
  );
}
