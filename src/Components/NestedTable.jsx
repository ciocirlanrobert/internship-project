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
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                const variables = { ...newData };
                delete variables.tableData;
                variables[makeInt] = +variables[makeInt];
                variables[makeBool] = variables[makeBool] === "true";
                addRow({ variables: variables });
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  const variables = { ...newData };
                  variables[makeBool] = variables[makeBool] === "true";
                  delete variables.tableData;
                  updateRow({ variables: variables });
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                const variables = { id: oldData.id };
                deleteRow({
                  variables: variables,
                });
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
