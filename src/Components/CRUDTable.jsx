import React from "react";
import MaterialTable from "material-table";
import NestedTable from "../Components/NestedTable";

export default function CRUDTable({
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
  jobRequirement,
}) {
  const [state, setState] = React.useState({
    columns: columns,
    data: tableData,
  });

  return (
    <MaterialTable
      detailPanel={(rowData) => {
        const nestedRequirements = rowData.jobRequirements.data.map((item) => ({
          id: item.id,
          name: item.name,
          jobId: rowData.id,
        }));
        const nestedBenefits = rowData.jobBenefits.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        const nestedSkills = rowData.jobSkills.data.map((item) => ({
          jobId: item.id,
          name: item.skill.name,
          skillId: item.skill.id,
          rating: item.rating,
        }));
        return (
          <>
            <NestedTable
              columns={rowData.jobRequirements.columns}
              tableData={nestedRequirements}
              title="Job requirements"
              updateRow={jobRequirement.update}
              deleteRow={jobRequirement.delete}
              addRow={jobRequirement.add}
              id="true"
            />
            <NestedTable
              columns={rowData.jobBenefits.columns}
              tableData={nestedBenefits}
              title="Job Benefits"
              id="true"
            />
            <NestedTable
              columns={rowData.jobSkills.columns}
              tableData={nestedSkills}
              title="Job Skills"
              id="true"
            />
          </>
        );
      }}
      title={title}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const variables = { ...newData };
              delete variables.tableData;
              variables[makeInt] = +variables[makeInt];
              variables[makeBool] = variables[makeBool] === "true";
              addRow({ variables: variables });
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const variables = { ...newData };
              variables[makeBool] = variables[makeBool] === "true";
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
