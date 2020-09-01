import React, { forwardRef } from "react";
import { JobApplications } from "../../queries";
import { useQuery } from "@apollo/client";
import { useUserContext } from "../../context/UserContext";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import FindInPageIcon from "@material-ui/icons/FindInPage";

export default function UserJobApplications() {
  const { data } = useQuery(JobApplications);
  const jobApplications = (data && data.userJobApplications) || [];
  const { user } = useUserContext();
  const history = useHistory();

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Company",
      field: "company",
    },
    {
      title: "Status",
      field: "status",
      cellStyle: (rowData) => ({
        backgroundColor: rowData.status === true ? "green" : "red",
      }),
    },
  ];

  const tableData =
    jobApplications &&
    jobApplications[0] &&
    jobApplications
      .filter((item) => item.user.id === user.id)
      .map((item) => ({
        id: item.job.id,
        name: item.job.name,
        company: item.job.company.name,
        status: item.isAccepted,
      }));

  return (
    <>
      {tableData !== undefined && (
        <MaterialTable
          title="My job applications"
          columns={columns}
          data={tableData}
          actions={[
            {
              icon: "ChevronLeft",
              tooltip: "See job",
              onClick: (event, rowData) => {
                history.push(`/jobs/${rowData.id}`);
              },
            },
          ]}
        />
      )}
    </>
  );
}
