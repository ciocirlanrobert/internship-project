import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { Job, JobApplications } from "../../queries";
import { CreateJobApplication } from "../../mutations";
import { makeStyles } from "@material-ui/core";
import { useUserContext } from "../../context/UserContext";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },

  jobDetails: {
    display: "flex",
  },
  ul: {
    listStyleType: "none",
    margin: "20px 0",
  },
  name: {
    fontSize: "50px",
    margin: "5px 10px",
  },
  description: {
    margin: "5px 5px 50px 5px",
  },
  listItem: {
    padding: 10,
  },
});

export default function JobDetail(props) {
  const state = props.location.state;
  const id = props.match.params.id;
  const style = useStyle();
  const { user } = useUserContext();
  const history = useHistory();

  const [job, setJob] = useState({});
  const [getJob, { data }] = useLazyQuery(Job, {
    variables: {
      id: +id,
    },
    onCompleted: () => {
      setJob(data.job);
    },
  });

  const [createJobApplication, { data: jobApplication }] = useMutation(
    CreateJobApplication
  );

  const { data: jobApplicationsRaw } = useQuery(JobApplications);

  const jobApplications =
    (jobApplicationsRaw && jobApplicationsRaw.userJobApplications) || [];

  useEffect(() => {
    if (!state) getJob();
    else {
      setJob(state);
    }
  }, []);

  const handleClick = () => {
    if (user.id < 0) {
      history.push("/login");
    } else {
      createJobApplication({
        variables: {
          userId: user.id,
          jobId: +id,
        },
      });
    }
  };

  const isUserApplicant = (jobApplications) => {
    return jobApplications.find((item) => {
      console.log(user.id, item.user.id, id, item.job.id);
      return user.id === item.user.id && +id === item.job.id;
    });
  };

  return (
    <>
      {job && job.jobRequirements && jobApplications[0] && (
        <div className={style.container}>
          <h1 className={style.name}>{job.name}</h1>
          <h3 className={style.company}>
            {state ? job.company : job.company.name}
          </h3>
          <h4 className={style.description}>{job.description}</h4>
          <div className="jobDetails">
            <ul className={style.ul}>
              <h3>Job Requirements</h3>
              {job.jobRequirements[0] ? (
                job.jobRequirements.map((item) => (
                  <li key={item.id} className={style.listItem}>
                    {item.name}
                  </li>
                ))
              ) : (
                <li key={1} className={style.listItem}>
                  No Requirements to display!
                </li>
              )}
            </ul>
            <ul className={style.ul}>
              <h3>Job Benefits</h3>
              {job.jobBenefits[0] ? (
                job.jobBenefits.map((item) => (
                  <li key={item.id} className={style.listItem}>
                    {item.name}
                  </li>
                ))
              ) : (
                <li key={1} className={style.listItem}>
                  No benefits to display!
                </li>
              )}
            </ul>
            <ul className={style.ul}>
              <h3>Tech Stack</h3>
              {job.jobSkills[0] ? (
                job.jobSkills.map((item) => (
                  <li key={item.skill.id} className={style.listItem}>
                    {item.skill.name}
                  </li>
                ))
              ) : (
                <li key={1} className={style.listItem}>
                  No skills to display!
                </li>
              )}
            </ul>
          </div>
          <div className={style.jobApplication}>
            {console.log("user applicant", isUserApplicant(jobApplications))}
            {console.log("user applications", jobApplications)}
            {isUserApplicant(jobApplications) || user.userRoleId >= 2 ? (
              <Button variant="contained" disabled>
                Applied
              </Button>
            ) : (
              <Button variant="contained" onClick={handleClick}>
                Apply!
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
