import React from "react";
import MaterialTable from "material-table";

export default function NestedTable({
  columns,
  tableData,
  updateRow,
  deleteRow,
  addRow,
  makeInt,
  actualName,
  makeBool,
  detail,
  title,
  id,
  jobId,
}) {
  const [state, setState] = React.useState({
    columns: columns,
    data: tableData,
  });
  return (
    <MaterialTable
      title={title}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const variables = { ...newData };
              if (id === "true") {
                variables["jobId"] = jobId;
              }

              delete variables.tableData;
              if (makeInt) {
                variables[makeInt] = +variables[makeInt];
              }
              if (makeBool) {
                variables[makeBool] = variables[makeBool] === "true";
              }
              addRow({ variables: variables });
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 300);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();

              const variables = { ...newData };
              if (makeBool) {
                variables[makeBool] = variables[makeBool] === "true";
              }
              if (id === "true") {
                variables["jobId"] = state.data[0].jobId;
              }
              if (makeInt) {
                variables[makeInt] = +variables[makeInt];
              }
              delete variables.tableData;
              updateRow({ variables: variables });
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const variables = { id: oldData.id };
              deleteRow({
                variables: variables,
              });
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
