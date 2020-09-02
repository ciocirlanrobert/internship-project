import React, { useState } from "react";
import MaterialTable from "material-table";
import { JobApplications } from "../../queries";
import { useQuery, useMutation } from "@apollo/client";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core";
import { UpdateJobApplication } from "../../mutations";

const useStyle = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  sectionContainer: {
    padding: 20,
  },
  list: { padding: 10, listStyle: "none" },
}));

export default function JobApplicantsTable({ job }) {
  const { data: queriedJobApplications } = useQuery(JobApplications);
  const [updateAccepted, { data: returnedAcceptedApplication }] = useMutation(
    UpdateJobApplication,
    {
      refetchQueries: [{ query: JobApplications }],
    }
  );

  const style = useStyle();
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applications =
    queriedJobApplications && queriedJobApplications.userJobApplications;

  const applicantsColumns = [
    { title: "First Name", field: "firstName", editable: null },
    { title: "Last Name", field: "lastName", editable: null },
    {
      title: "Accepted",
      field: "isAccepted",
      lookup: {
        true: "True",
        false: "False",
      },
    },
  ];

  const tableData =
    (applications !== undefined &&
      applications
        .filter((item) => item.job.id === job.id)
        .map((item) => ({
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          isAccepted: item.isAccepted,
          contactInfo: item.user.contactInfo,
          education: item.user.userEducations,
          work: item.user.userWorkExperiences,
          skills: item.user.userSkills,
          id: item.id,
        }))) ||
    [];

  const handleClick = (event, rowData) => {
    setRowData(rowData);
    setOpen(true);
  };

  const modalBody = (
    <div className={style.paper}>
      <div className={style.sectionContainer}>
        <h1 className={style.sectionTitle}>Education</h1>
        <ul className={style.list}>
          {rowData.education ? (
            rowData.education.map((item) => (
              <>
                <li key={item.id} className={style.listItem}>
                  {item.institution} - {item.description}
                </li>
              </>
            ))
          ) : (
            <li key={1}>No education to display!</li>
          )}
        </ul>
      </div>
      <div className={style.sectionContainer}>
        <h1 className={style.sectionTitle}>Work Experience</h1>
        <ul className={style.list}>
          {rowData.work ? (
            rowData.work.map((item) => (
              <>
                <li key={item.id} className={style.listItem}>
                  {item.institution} - {item.description}
                </li>
              </>
            ))
          ) : (
            <li key={1}>No work experience to display!</li>
          )}
        </ul>
      </div>
      <div className={style.sectionContainer}>
        <h1 className={style.sectionTitle}>Education</h1>
        <ul className={style.list}>
          {rowData.skills ? (
            rowData.skills.map((item) => (
              <>
                <li key={item.id} className={style.listItem}>
                  {item.skill.name} - {item.rating}
                </li>
              </>
            ))
          ) : (
            <li key={1}>No skills to display!</li>
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <MaterialTable
        title="Applicants"
        data={tableData}
        columns={applicantsColumns}
        onRowClick={handleClick}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                console.log(newData);
                updateAccepted({
                  variables: {
                    id: newData.id,
                    isAccepted: newData.isAccepted === "true",
                  },
                });
              }, 600);
            }),
        }}
      />
      <Modal open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
    </>
  );
}
