import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EducationCard from "./EducationCard";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddUserEducation } from "../../../mutations";
import { useMutation } from "@apollo/client";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useUserContext } from "../../../context/UserContext";
import moment from "moment";
import { Educations } from "../../../queries";

const useStyle = makeStyles((theme) => ({
  sectionTitle: {
    padding: 30,
  },
  add: {
    display: "inline",
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 20,
  },
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  formRow: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
  },
}));

export default function Education({ educations }) {
  const style = useStyle();
  const { user } = useUserContext();

  const [educationInfo, setEducationInfo] = useState({
    institution: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [open, setOpen] = useState(false);

  const [addUserEducation] = useMutation(AddUserEducation, {
    variables: {
      institution: educationInfo.institution,
      description: educationInfo.description,
      userId: user.id,
      // startDate: `${moment(educationInfo.startDate, "DD-MM-YYY").unix()}`,
      // endDate: `${moment(educationInfo.endDate, "DD-MM-YYY").unix()}`,
    },
    refetchQueries: [
      {
        query: Educations,
        variables: {
          id: user.id,
        },
      },
    ],
  });

  const handleAddSubmit = (event) => {
    event.preventDefault();
    addUserEducation();
    handleEditClose();
  };

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setEducationInfo({
      ...educationInfo,
      [event.target.name]: event.target.value,
    });
  };

  const AddBody = (
    <div className={style.paper}>
      <h1>Edit</h1>
      <form onSubmit={handleAddSubmit}>
        <div className={style.formRow}>
          <label className={style.label}>Description</label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="description"
            autoComplete="off"
            autoFocus
            defaultValue={educations["description"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.formRow}>
          <label className={style.label}>Institution</label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="institution"
            autoComplete="off"
            autoFocus
            defaultValue={educations["institution"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.formRow}>
          <label classname={style.label}>Starting date</label>
          <TextField
            onChange={handleChange}
            id="date"
            type="date"
            name="startDate"
            defaultValue={educations["startDate"]}
            className={style.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={style.formRow}>
          <label classname={style.label}>Ending date</label>
          <TextField
            onChange={handleChange}
            id="date"
            type="date"
            name="endDate"
            defaultValue={educations["endDate"]}
            className={style.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          id="submit"
        >
          Save changes
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <h1 className={style.sectionTitle}>Education</h1>
      {educations.length > 0 &&
        educations.map((item) => (
          <EducationCard
            description={item.description}
            id={item.id}
            institution={item.institution}
            startDate={item.startDate}
            endDate={item.endDate}
            key={item.id}
            userId={user.id}
          />
        ))}
      <Modal open={open} onClose={handleEditClose}>
        {AddBody}
      </Modal>
      <div className={style.buttons}>
        <IconButton
          color="inherit"
          size="medium"
          className={style.add}
          onClick={handleEditOpen}
        >
          <AddIcon />
        </IconButton>
      </div>
    </>
  );
}
