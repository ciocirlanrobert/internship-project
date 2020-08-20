import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { useMutation } from "@apollo/client";
import { DeleteUserSkill } from "../../../mutations";
import { UserSkills } from "../../../queries";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  skillContainer: {
    display: "flex",
  },
}));

export default function SkillCard({ name, skillId, userId, rating }) {
  const style = useStyles();
  const [deleteUserSkill] = useMutation(DeleteUserSkill, {
    variables: {
      id: skillId,
    },
    refetchQueries: [
      {
        query: UserSkills,
        variables: {
          id: userId,
        },
      },
    ],
  });

  const handleDelete = () => {
    deleteUserSkill();
  };

  return (
    <div className={style.skillContainer}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={rating} readOnly />
      </Box>
      <li>
        <Chip label={name} onDelete={handleDelete} className={style.chip} />
      </li>
    </div>
  );
}
