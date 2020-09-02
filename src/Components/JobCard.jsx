import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: 30,
  },
  media: {
    height: 140,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

export default function JobCard({
  name,
  description,
  companyName,
  id,
  jobRequirements,
  jobBenefits,
  jobSkills,
}) {
  const style = useStyles();

  return (
    <Card className={style.root}>
      <CardActionArea>
        <CardMedia
          className={style.media}
          image="https://picsum.photos/200/300"
          title="Test photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="body2" component="p">
            {companyName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link
            to={{
              pathname: `/jobs/${id}`,
              state: {
                jobRequirements: jobRequirements,
                jobBenefits: jobBenefits,
                jobSkills: jobSkills,
                name: name,
                description: description,
                companyName: companyName,
              },
            }}
          >
            Learn More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
