import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/client";
import EducationCard from "./EducationCard";
import { Educations } from "../../queries";
import { useUserContext } from "../../context/UserContext";

const useStyle = makeStyles({
  sectionTitle: {
    padding: 30,
  },
});

export default function Education() {
  const style = useStyle();
  const { user } = useUserContext();

  const { data: queriedEducations } = useQuery(Educations, {
    variables: {
      id: user.id,
    },
    onCompleted: () => {
      console.log(queriedEducations);
    },
  });

  const educations =
    (queriedEducations && queriedEducations.user.userEducations) || [];

  return (
    <>
      <h1 className={style.sectionTitle}>Education</h1>
      {educations.length > 0 &&
        educations.map((item) => (
          <EducationCard
            description={item.description}
            id={item.id}
            institution={item.institution}
            startDate={item.startDate}
            endDate={item.endDate}
            key={item.id}
          />
        ))}
    </>
  );
}
