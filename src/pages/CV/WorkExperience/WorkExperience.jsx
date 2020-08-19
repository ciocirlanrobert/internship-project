import React from "react";
import CvSection from "../CvSection";

export default function WorkExperience({ jobs }) {
  return <CvSection title="Work Experience" data={jobs} />;
}
