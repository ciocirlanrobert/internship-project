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
import moment from "moment";
import {
  DeleteUserWorkExperience,
  UpdateUserWorkExperience,
} from "../../mutations";
import { UserWorkExperiences } from "../../queries";
import { useUserContext } from "../../context/UserContext";

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

export default function CvCard(props) {
  const style = useStyle();
  const { user } = useUserContext();

  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [data, setData] = useState({
    institution: props.institution,
    description: props.description,
    startDate: props.startDate,
    endDate: props.endDate,
  });

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setDel(true);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    updateUserWorkExeperience();
    handleEditClose();
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const [deleteUserWorkExperience] = useMutation(DeleteUserWorkExperience, {
    variables: {
      id: props.id,
    },
    refetchQueries: [
      {
        query: UserWorkExperiences,
        variables: {
          id: props.userId,
        },
      },
    ],
  });

  const [updateUserWorkExeperience, { data: returnedUserWE }] = useMutation(
    UpdateUserWorkExperience,
    {
      variables: {
        institution: data.institution,
        description: data.description,
        id: props.id,
        userId: user.id,
      },
      onCompleted: () => {
        props = (returnedUserWE && returnedUserWE) || [];
      },
    }
  );

  const editBody = (
    <div className={style.paper}>
      <h1>Edit</h1>
      <form onSubmit={handleEditSubmit}>
        {Object.keys(props).map(
          (item) =>
            item !== "id" &&
            item !== "userId" && (
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

  const deleteBody = (
    <div className={style.paper}>
      <h1>Are you sure you want to delete it?</h1>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        id="submit"
        onClick={deleteUserWorkExperience}
      >
        Yes
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        id="submit"
        onClick={() => setDel(false)}
      >
        No
      </Button>
    </div>
  );

  return (
    <Card className={style.root}>
      {console.log(props.id)}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.institution}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
        <Typography variant="body2" component="p">
          {moment(props.startDate, "X").format("lll")} -
          {moment(props.endDate, "X").format("lll")}
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
        <Modal open={del}>{deleteBody}</Modal>
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
