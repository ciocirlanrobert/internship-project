import React from "react";
import { useQuery, gql } from "@apollo/client";
import JobCard from "./JobCard";
import { makeStyles } from "@material-ui/core/styles";
import { Jobs } from "../queries";

const useStyles = makeStyles({
  jobsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: 20,
    flexWrap: "wrap",
  },
});

export default function JobsContainer() {
  const { data } = useQuery(Jobs);
  const style = useStyles();

  return (
    <>
      <div className={style.jobsContainer}>
        {data !== undefined &&
          data.jobs
            .filter((job) => job.isAvailable === true)
            .map((availableJob) => (
              <JobCard
                id={availableJob.id}
                key={availableJob.id}
                name={availableJob.name}
                description={availableJob.description}
                companyName={availableJob.company.name}
                isAvailable="true"
                jobRequirements={availableJob.jobRequirements}
                jobBenefits={availableJob.jobBenefits}
                jobSkills={availableJob.jobSkills}
              />
            ))}
      </div>
    </>
  );
}
