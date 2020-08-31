import React from "react";
import CRUDTable from "../../Components/CRUDTable";
import { useQuery, useMutation } from "@apollo/client";
import { Jobs, Companies } from "../../queries";
import {
  UpdateJobInfo,
  DeleteJob,
  UpdateJobRequirement,
  DeleteJobRequirement,
  CreateJobRequirement,
  UpdateJobBenefit,
  DeleteJobBenefit,
  CreateJobBenefit,
  UpdateJobSkill,
  DeleteJobSkill,
  CreateJobSkill,
  CreateJob,
} from "../../mutations";
import { useUserContext } from "../../context/UserContext";

import { Skills } from "../../queries";

export default function CompanyTable() {
  const { user } = useUserContext();
  const { data } = useQuery(Jobs);
  const { data: queriedSkills } = useQuery(Skills);
  const { data: queriedCompanies } = useQuery(Companies);
  const [updateJobInfo, { data: returnedJobInfo }] = useMutation(UpdateJobInfo);
  const [deleteJob, { data: returnedDelete }] = useMutation(DeleteJob, {
    refetchQueries: [
      {
        query: Jobs,
      },
    ],
  });

  const jobs = (data && data.jobs) || [];
  const skills = (queriedSkills && queriedSkills.skills) || [];
  const companies = (queriedCompanies && queriedCompanies.companies) || [];

  const [updateJobRequirement, { data: returnedJobRequirement }] = useMutation(
    UpdateJobRequirement,
    {
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }
  );
  const [
    deleteJobRequirement,
    { data: returnedDeleteRequirement },
  ] = useMutation(DeleteJobRequirement, {
    refetchQueries: [
      {
        query: Jobs,
      },
    ],
  });
  const [
    createJobRequirement,
    { data: returnedCreatedJobRequirement },
  ] = useMutation(CreateJobRequirement, {
    refetchQueries: [
      {
        query: Jobs,
      },
    ],
  });

  const [updateJobBenefit, { data: returnedJobBenefit }] = useMutation(
    UpdateJobBenefit,
    {
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }
  );
  const [deleteJobBenefit, { data: returnedDeleteBenefit }] = useMutation(
    DeleteJobBenefit,
    {
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }
  );

  const [createJobBenefit, { data: returnedCreatedJobBenefit }] = useMutation(
    CreateJobBenefit,
    {
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }
  );

  const [updateJobSkill, { data: returnedJobSkill }] = useMutation(
    UpdateJobSkill,
    {
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }
  );

  const [deleteJobSkill, { data: returnedDeleteSkill }] = useMutation(
    DeleteJobSkill,
    {
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }
  );

  const [createJobSkill, { data: returnedCreatedJobSkill }] = useMutation(
    CreateJobSkill,
    {
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }
  );

  const [createJob, { data: returnedJob }] = useMutation(CreateJob);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
    { title: "Company", field: "companyName", editable: {} },
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
      editable: "onAdd",
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

  const company = companies.find((element) => element.user.id === user.id);

  const tableData = jobs
    .filter((item) => item.company.name === company.name)
    .map((item) => ({
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

  const jobRequirementCRUD = {
    update: updateJobRequirement,
    delete: deleteJobRequirement,
    add: createJobRequirement,
  };

  const jobBenefitCRUD = {
    update: updateJobBenefit,
    delete: deleteJobBenefit,
    add: createJobBenefit,
  };

  const jobSkillCRUD = {
    update: updateJobSkill,
    delete: deleteJobSkill,
    add: createJobSkill,
    skills: skills,
  };

  return (
    jobs.length > 0 && (
      <CRUDTable
        title="Jobs"
        columns={columns}
        tableData={tableData}
        updateRow={updateJobInfo}
        deleteRow={deleteJob}
        addRow={createJob}
        makeBool={"isAvailable"}
        jobRequirement={jobRequirementCRUD}
        jobBenefit={jobBenefitCRUD}
        jobSkill={jobSkillCRUD}
        companyId={company.id}
      />
    )
  );
}
