import React from "react";
import CRUDTable from "../../Components/CRUDTable";
import { useQuery, useMutation } from "@apollo/client";
import { Users } from "../../queries";
import { UpdateUser, DeleteUser, AddUser } from "../../mutations";

export default function UsersTable() {
  const { data } = useQuery(Users);
  const [updateUser, { data: returnedUser }] = useMutation(UpdateUser);
  const [deleteUser, { data: deleted }] = useMutation(DeleteUser, {
    refetchQueries: [
      {
        query: Users,
      },
    ],
  });

  const [addUser, { data: added }] = useMutation(AddUser, {
    refetchQueries: [
      {
        query: Users,
      },
    ],
  });

  const users = (data && data.users) || [];
  const columns = [
    { title: "Username", field: "username" },
    { title: "Password", field: "password" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    {
      title: "Role",
      field: "userRoleId",
      type: "numeric",
      lookup: {
        1: "Admin",
        2: "Company User",
        3: "Simple User",
      },
    },
  ];

  const tableData = users.map((item) => ({
    username: item.username,
    password: item.password,
    firstName: item.firstName,
    lastName: item.lastName,
    id: item.id,
  }));

  return (
    <>
      {users.length > 0 && (
        <CRUDTable
          columns={columns}
          tableData={tableData}
          updateRow={updateUser}
          deleteRow={deleteUser}
          addRow={addUser}
          makeInt={"userRoleId"}
          actualName={"userRole.id"}
        />
      )}
    </>
  );
}
