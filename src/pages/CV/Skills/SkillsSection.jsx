import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useUserContext } from "../../../context/UserContext";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SkillCard from "./SkillCard";
import Paper from "@material-ui/core/Paper";
import { useMutation } from "@apollo/client";
import SkillsForm from "../../../Components/SkillsForm";
import { CreateUserSkill } from "../../../mutations";
import { UserSkills } from "../../../queries";

const useStyle = makeStyles((theme) => ({
  skillList: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
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

export default function SkillsSection({ title, data }) {
  const { user } = useUserContext();
  const style = useStyle();

  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState({
    name: "",
  });

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSkill({
      ...skill,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    handleEditClose();
  };

  return (
    <>
      <h1 className={style.sectionTitle}>{title}</h1>
      <Modal open={open} onClose={handleEditClose}>
        <SkillsForm
          onClose={open}
          mutation={CreateUserSkill}
          id={user.id}
          specificQuery={UserSkills}
        />
      </Modal>
      <Paper component="ul" className={style.skillList}>
        {data.length > 0 &&
          data.map((item) => (
            <SkillCard
              name={item.skill.name}
              skillId={item.id}
              key={item.id}
              userId={user.id}
              rating={item.rating}
            />
          ))}
      </Paper>
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
