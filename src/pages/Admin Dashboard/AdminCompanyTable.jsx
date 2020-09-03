import React from "react";
import MaterialTable from "material-table";
import { useQuery, useMutation } from "@apollo/client";
import { Companies, Users } from "../../queries";
import {
  CreateContactInfo,
  CreateCompany,
  UpdateCompany,
} from "../../mutations";

export default function AdminCompanyTable() {
  const { data: queriedCompanies } = useQuery(Companies);
  const { data: queriedUsers } = useQuery(Users);

  const [createContactInfo, { data: returnedContactInfo }] = useMutation(
    CreateContactInfo,
    {
      variables: {
        email: "",
        phone: "",
        city: "",
        website: "",
        avatarUrl: "",
        about: "",
        countryId: 3,
      },
    }
  );

  const [
    updateCompany,
    { data: returnedUpdatedCompany },
  ] = useMutation(UpdateCompany, { refetchQueries: [{ query: Companies }] });

  const [createCompany, { data: returnedCompany }] = useMutation(
    CreateCompany,
    { refetchQueries: [{ query: Companies }] }
  );

  const companies = (queriedCompanies && queriedCompanies.companies) || [];
  const users = (queriedUsers && queriedUsers.users) || [];

  const usersLookup = () => {
    const lookup = {};
    users &&
      users
        .filter((item) => item.userRole.id === 2)
        .forEach((item) => {
          lookup[item.id] = item.username;
        });

    return lookup;
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Company Admin", field: "username", lookup: usersLookup() },
  ];

  const tableData = companies.map((item) => ({
    name: item.name,
    id: item.id,
    username: item.user.username,
  }));

  return (
    companies !== undefined &&
    users !== undefined && (
      <MaterialTable
        title="Companies"
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const variables = { ...newData };
                createContactInfo().then((response) => {
                  createCompany({
                    variables: {
                      name: variables.name,
                      userId: +variables.username,
                      contactInfoId: +response.data.createContactInfo.id,
                    },
                  });
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const variables = { ...newData };
                console.log(oldData);
                console.log(variables);
                updateCompany({
                  variables: {
                    name: variables.name,
                    id: +variables.id,
                    userId: +variables.username,
                  },
                });
              }, 600);
            }),
        }}
      />
    )
  );
}
