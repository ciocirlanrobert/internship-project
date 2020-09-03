import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserContext } from "../context/UserContext";
import { UpdateContactInfo } from "../mutations";
import { UserContactInfo } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import Select from "@material-ui/core/Select";
import { Countries } from "../queries";
import { MenuItem } from "@material-ui/core";
import MaterialTable from "material-table";

const useStyle = makeStyles({
  generalInfo: {
    padding: 0,
  },
  sectionTitle: {
    padding: 30,
  },

  formRow: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
  },

  label: {
    fontSize: 25,
  },
});

export default function GeneralInfo() {
  const style = useStyle();
  const { user } = useUserContext();

  const [updateContactInfo, { data: contactInfoData }] = useMutation(
    UpdateContactInfo,
    {
      refetchQueries: [{ query: UserContactInfo }],
    }
  );

  const { data: querriedContactInfo } = useQuery(UserContactInfo, {
    variables: {
      id: user.id,
    },
  });

  const { data: querriedCountries } = useQuery(Countries);

  const contactInfo =
    (querriedContactInfo && querriedContactInfo.user.contactInfo) || [];

  const lookup = {};
  const countries =
    (querriedCountries &&
      querriedCountries.counties.forEach((item) => {
        lookup[item.id] = item.name;
      })) ||
    {};

  console.log(countries);
  const tableData = contactInfo && [
    {
      id: contactInfo.id,
      about: contactInfo.about,
      avatarUrl: contactInfo.avatarUrl,
      city: contactInfo.city,
      email: contactInfo.email,
      phone: contactInfo.phone,
      website: contactInfo.website,
    },
  ];

  const columns = [
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Phone Number",
      field: "phone",
    },
    {
      title: "Website",
      field: "website",
    },
    {
      title: "Avatar",
      field: "avatarUrl",
    },
    {
      title: "City",
      field: "city",
    },
    {
      title: "About",
      field: "about",
    },
    {
      title: "Country",
      field: "countryId",
      lookup: lookup,
    },
  ];

  return (
    <>
      {contactInfo && (
        <MaterialTable
          title="General Info"
          columns={columns}
          data={tableData}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const variables = { ...newData };
                  console.log(variables);
                  updateContactInfo({
                    variables: {
                      about: variables.about,
                      id: variables.id,
                      avatarUrl: variables.avatarUrl,
                      city: variables.city,
                      email: variables.email,
                      phone: variables.phone,
                      website: variables.website,
                    },
                  });
                }, 600);
              }),
          }}
        />
      )}
    </>
  );
}
