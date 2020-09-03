import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Jobs, Companies } from "../../queries";
import { useUserContext } from "../../context/UserContext";
import MaterialTable from "material-table";
import JobApplicantsTable from "./JobApplicantsTable";
import Footer from "../../Components/Footer";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  tableContainer: {
    margin: 20,
  },
});

export default function CompanyJobApplications() {
  const { data } = useQuery(Jobs);
  const { data: queriedCompanies } = useQuery(Companies);
  const { user } = useUserContext();
  const style = useStyle();

  const jobs = (data && data.jobs) || [];
  const companies = (queriedCompanies && queriedCompanies.companies) || [];

  const company = companies.find((element) => element.user.id === user.id);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
    {
      title: "Availability",
      field: "isAvailable",
      lookup: {
        true: "True",
        false: "False",
      },
    },
  ];

  const tableData =
    company &&
    jobs !== undefined &&
    jobs
      .filter((item) => item.company.name === company.name)
      .map((item) => ({
        name: item.name,
        description: item.description,
        isAvailable: item.isAvailable,
        id: item.id,
      }));

  return (
    <>
      {(company !== undefined && jobs !== undefined && (
        <div className={style.root}>
          <div className={style.tableContainer}>
            <MaterialTable
              title="Job Applicants"
              detailPanel={(rowData) => {
                return <JobApplicantsTable job={rowData} />;
              }}
              columns={columns}
              data={tableData}
            />
          </div>
          <Footer />
        </div>
      )) || <MaterialTable title="Job Applicants" />}
    </>
  );
}
