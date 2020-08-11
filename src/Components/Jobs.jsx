import React from "react";
import { useQuery, gql } from "@apollo/client";
import JobCard from "./JobCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  jobsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: 20,
    flexWrap: "wrap",
  },
});

export default function Jobs() {
  const JOBS = gql`
    query jobs {
      jobs {
        id
        description
        name
        isAvailable
        company {
          name
        }
      }
    }
  `;

  const { data } = useQuery(JOBS);
  const style = useStyles();

  return (
    <React.Fragment>
      <div className={style.jobsContainer}>
        {data &&
          data.jobs
            .filter((job) => job.isAvailable === true)
            .map((availableJob) => (
              <JobCard
                key={availableJob.id}
                name={availableJob.name}
                description={availableJob.description}
                company={availableJob.company.name}
              />
            ))}
      </div>
    </React.Fragment>
  );
}
