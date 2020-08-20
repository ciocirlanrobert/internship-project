import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import { Skills } from "../queries";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const useStyle = makeStyles((theme) => ({
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

export default function SkillsForm({ mutation, id, specificQuery }) {
  const { data } = useQuery(Skills);
  const [skillId, setSkillId] = useState();
  const [rating, setRating] = useState();
  const style = useStyle();

  const [add] = useMutation(mutation, {
    variables: {
      id: id,
      skillId: skillId,
      rating: rating,
    },
    refetchQueries: [
      {
        query: Skills,
      },
      {
        query: specificQuery,
        variables: {
          id: id,
        },
      },
    ],
  });
  const handleChange = (event) => {
    setSkillId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    add();
  };

  const skills = (data && data.skills) || [];

  return (
    <div className={style.paper}>
      <h1>Add a new skill</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.formRow}>
          <label className={style.label}>Skill</label>
          <Select className={style.dropdown} onChange={handleChange}>
            {skills &&
              skills.map((skill) => (
                <MenuItem key={skill.id} value={skill.id}>
                  {skill.name}
                </MenuItem>
              ))}
          </Select>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          id="submit"
        >
          Add skill
        </Button>
      </form>
    </div>
  );
}
