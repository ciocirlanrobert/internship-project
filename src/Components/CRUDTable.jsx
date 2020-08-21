import React from "react";
import MaterialTable from "material-table";

export default function CRUDTable({
  columns,
  users,
  updateRow,
  deleteRow,
  addRow,
  makeInt,
  actualName,
}) {
  const [state, setState] = React.useState({
    columns: columns,
    data: users,
  });

  return (
    <MaterialTable
      title="Editable Example"
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
