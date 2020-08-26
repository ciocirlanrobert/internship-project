import React from "react";
import CRUDTable from "../../Components/CRUDTable";
import { useQuery, useMutation } from "@apollo/client";
import { Jobs } from "../../queries";
import { UpdateJobInfo, DeleteJob } from "../../mutations";

export default function CompanyTable() {
  const { data } = useQuery(Jobs);
  const [updateJobInfo, { data: returnedJobInfo }] = useMutation(UpdateJobInfo);
  const [deleteJob, { data: returnedDelete }] = useMutation(DeleteJob, {
    refetchQueries: [
      {
        query: Jobs,
      },
    ],
  });
  const jobs = (data && data.jobs) || [];

  const columns = [
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
    { title: "company", field: "companyName" },
    {
      title: "Availability",
      field: "isAvailable",
      lookup: {
        true: "True",
        false: "False",
      },
    },
  ];

  const jobRequirementsColumns = [
    {
      title: "Requirement",
      field: "name",
    },
  ];

  const jobBenefitsColumns = [
    {
      title: "Benefit",
      field: "name",
    },
  ];

  const jobSkillsColumns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Rating",
      field: "rating",
      lookup: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
  ];

  const tableData = jobs.map((item) => ({
    name: item.name,
    description: item.description,
    companyName: item.company.name,
    isAvailable: item.isAvailable,
    id: item.id,
    jobRequirements: {
      data: item.jobRequirements,
      columns: jobRequirementsColumns,
    },
    jobBenefits: {
      data: item.jobBenefits,
      columns: jobBenefitsColumns,
    },
    jobSkills: {
      data: item.jobSkills,
      columns: jobSkillsColumns,
    },
  }));

  console.log("company", tableData);

  return (
    jobs.length > 0 && (
      <CRUDTable
        title="Jobs"
        columns={columns}
        tableData={tableData}
        updateRow={updateJobInfo}
        deleteRow={deleteJob}
        makeBool={"isAvailable"}
      />
    )
  );
}
