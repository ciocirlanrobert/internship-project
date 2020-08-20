import React from "react";
import Container from "@material-ui/core/Container";
import Education from "./Education/Education";
import { makeStyles } from "@material-ui/core";
import { Educations, UserWorkExperiences, UserSkills } from "../../queries";
import { useUserContext } from "../../context/UserContext";
import { useQuery, useMutation } from "@apollo/client";
import WorkExperience from "./WorkExperience/WorkExperience";
import Skills from "./Skills/Skills";

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

  const { data: queriedWorkExperience } = useQuery(UserWorkExperiences, {
    variables: {
      id: user.id,
    },
  });

  const { data: queriedSkills } = useQuery(UserSkills, {
    variables: {
      id: user.id,
    },
  });

  const educations =
    (queriedEducations && queriedEducations.user.userEducations) || [];

  const workExperience =
    (queriedWorkExperience && queriedWorkExperience.user.userWorkExperiences) ||
    [];

  const skills = (queriedSkills && queriedSkills.user.userSkills) || [];

  return (
    <>
      <Container maxWidth="md" className={style.mainInfo} component="main">
        <Education educations={educations} />
      </Container>
      <Container maxWidth="md" className={style.mainInfo} component="main">
        <WorkExperience jobs={workExperience} />
      </Container>
      <Container maxWidth="md" className={style.mainInfo} component="main">
        <Skills skills={skills} />
      </Container>
    </>
  );
}
