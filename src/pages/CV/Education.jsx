import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EducationCard from "./EducationCard";

const useStyle = makeStyles({
  sectionTitle: {
    padding: 30,
  },
});

export default function Education({ educations }) {
  const style = useStyle();

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
