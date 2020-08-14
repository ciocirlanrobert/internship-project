import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyle = makeStyles({
  root: {
    width: 345,
    margin: 30,
  },
});

export default function EducationCard({
  institution,
  description,
  startDate,
  endDate,
  id,
}) {
  const style = useStyle();
  return (
    <Card className={style.root}>
      {console.log(id)}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {institution}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography variant="body2" component="p">
          {startDate} - {endDate}
        </Typography>
        <IconButton edge="start" color="inherit" fontSize="small">
          <EditIcon />
        </IconButton>
        <IconButton edge="start" color="inherit" fontSize="small">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
