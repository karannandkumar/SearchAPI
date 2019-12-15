import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    width: 195,
    height: 275
  },
  media: {
    width: 195,
    height: 195
  }
});

export default function IkeaSingle({ item }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={item.image} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
