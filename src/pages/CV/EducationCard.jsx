import React, { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import { UpdateUserEducation } from "../../mutations";

const useStyle = makeStyles((theme) => ({
  root: {
    width: 345,
    margin: 30,
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
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function EducationCard(props) {
  const style = useStyle();

  const [open, setOpen] = useState(false);
  const [educationInfo, setEducationInfo] = useState({
    institution: props.institution,
    description: props.description,
    startDate: props.startDate,
    endDate: props.endDate,
    id: props.id,
  });

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {};

  const handleEditSubmit = (event) => {
    event.preventDefault();
    console.log(educationInfo);
    updateUserEducation();
    handleEditClose();
  };

  const handleChange = (event) => {
    setEducationInfo({
      ...educationInfo,
      [event.target.name]: event.target.value,
    });
  };

  const [updateUserEducation, { data: returnedUserEducation }] = useMutation(
    UpdateUserEducation,
    {
      variables: {
        institution: educationInfo.institution,
        description: educationInfo.description,
        id: props.id,
        startDate: educationInfo.startDate,
        endDate: educationInfo.endDate,
      },
      onCompleted: () => {
        props = (returnedUserEducation && returnedUserEducation) || [];
      },
    }
  );

  const editBody = (
    <div className={style.paper}>
      <h1>Edit</h1>
      <form onSubmit={handleEditSubmit}>
        {Object.keys(props).map(
          (item) =>
            item !== "id" && (
              <div className={style.formRow} key={item}>
                <label className={style.label}>{item}</label>
                {item === "startDate" || item === "endDate" ? (
                  <TextField
                    onChange={handleChange}
                    id="date"
                    label="Birthday"
                    type="date"
                    name={item}
                    defaultValue={props[item]}
                    className={style.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    name={item}
                    autoComplete="off"
                    autoFocus
                    defaultValue={props[item]}
                    onChange={handleChange}
                  />
                )}
              </div>
            )
        )}
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
    <Card className={style.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.institution}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
        <Typography variant="body2" component="p">
          {props.startDate} - {props.endDate}
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          fontSize="small"
          onClick={handleEditOpen}
        >
          <EditIcon />
        </IconButton>
        <Modal open={open} onClose={handleEditClose}>
          {editBody}
        </Modal>
        <IconButton
          edge="start"
          color="inherit"
          fontSize="small"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
