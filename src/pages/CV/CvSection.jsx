import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useUserContext } from "../../context/UserContext";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CvCard from "./CvCard";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CreateUserWorkExperience } from "../../mutations";
import { UserWorkExperiences } from "../../queries";
import { useMutation } from "@apollo/client";
import moment from "moment";

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

export default function CvSection({ title, data }) {
  const { user } = useUserContext();
  const style = useStyle();

  const [open, setOpen] = useState(false);
  const [work, setWork] = useState({
    institution: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setWork({
      ...work,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    console.log(work);
    adduserWorkExperience();
    handleEditClose();
  };

  const [adduserWorkExperience] = useMutation(CreateUserWorkExperience, {
    variables: {
      institution: work.institution,
      description: work.description,
      userId: user.id,
      //   startDate: String(moment(work.startDate, "YYYY-MM-DD").unix()),
      //   //   endDate: `${moment(work.endDate, "MM-DD-YYYY").unix()}`,
    },
    refetchQueries: [
      {
        query: UserWorkExperiences,
        variables: {
          id: user.id,
        },
      },
    ],
  });
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
            defaultValue={data["description"]}
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
            defaultValue={data["institution"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.formRow}>
          <label className={style.label}>Starting date</label>
          <TextField
            onChange={handleChange}
            id="date"
            type="date"
            name="startDate"
            defaultValue={data["startDate"]}
            className={style.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={style.formRow}>
          <label className={style.label}>Ending date</label>
          <TextField
            onChange={handleChange}
            id="date"
            type="date"
            name="endDate"
            defaultValue={data["endDate"]}
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
      <h1 className={style.sectionTitle}>{title}</h1>
      {data.length > 0 &&
        data.map((item) => (
          <CvCard
            key={item.id}
            institution={item.institution}
            description={item.description}
            startDate={item.startDate}
            endDate={item.endDate}
            id={item.id}
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
