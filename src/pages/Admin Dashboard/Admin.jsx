import React from "react";
import UsersTable from "./UsersTable";
import { makeStyles } from "@material-ui/core";
import Footer from "../../Components/Footer";
import AdminCompanyTable from "./AdminCompanyTable";

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

export default function Admin() {
  const style = useStyle();

  return (
    <div className={style.root}>
      <div className={style.tableContainer}>
        <UsersTable />
      </div>
      <div className={style.tableContainer}>
        <AdminCompanyTable />
      </div>
      <Footer />
    </div>
  );
}
