import React from "react";
import MaterialTable from "material-table";
import NestedTable from "../Components/NestedTable";
import SkillsTable from "../pages/Company Dashboard/SkillsTable";

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
  jobBenefit,
  jobSkill,
  companyId,
}) {
  const [state, setState] = React.useState({
    columns: columns,
    data: tableData,
  });
  console.log(companyId);
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
          jobId: rowData.id,
        }));
        const nestedSkills = rowData.jobSkills.data.map((item) => ({
          id: item.id,
          name: item.skill.name,
          skillId: item.skill.id,
          rating: item.rating,
          jobId: rowData.id,
          skills: jobSkill.skills,
        }));

        console.log(rowData);

        return (
          <>
            <NestedTable
              columns={rowData.jobRequirements.columns}
              tableData={nestedRequirements}
              title="Job requirements"
              updateRow={jobRequirement.update}
              deleteRow={jobRequirement.delete}
              addRow={jobRequirement.add}
              jobId={rowData.id}
              id="true"
            />
            <NestedTable
              columns={rowData.jobBenefits.columns}
              tableData={nestedBenefits}
              title="Job Benefits"
              updateRow={jobBenefit.update}
              deleteRow={jobBenefit.delete}
              addRow={jobBenefit.add}
              jobId={rowData.id}
              id="true"
            />
            <SkillsTable
              columns={rowData.jobSkills.columns}
              tableData={nestedSkills}
              title="Job Skills"
              id="true"
              updateRow={jobSkill.update}
              deleteRow={jobSkill.delete}
              addRow={jobSkill.add}
              makeInt="rating"
              jobId={rowData.id}
            />
          </>
        );
      }}
      title={title}
      columns={state.columns}
      data={state.data}
      editable={{
        isDeletable: (rowData) => title !== "Jobs",
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const variables = { ...newData };
              delete variables.tableData;
              if (makeInt) {
                variables[makeInt] = +variables[makeInt];
              }
              if (makeBool) {
                variables[makeBool] = variables[makeBool] === "true";
              }
              variables["companyId"] = companyId;
              console.log(companyId);
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
