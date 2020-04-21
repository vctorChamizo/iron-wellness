import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1587316371/iron-wellness/components/nutrition/main-nutrition_hsljhq.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  wrapperTitle: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    padding: "30vh 0 42.5vh 10vw",
  },
}));

export const Nutrition = () => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.background}>
        <div className={classes.wrapperTitle}>
          <Typography variant="h2" component="h2">
            NUTRICIÓN
          </Typography>
          <Typography variant="subtitle1">
            Disfruta de las mejores recetas. Elige la que mas te guste y empieza
            a cocinar.
          </Typography>
        </div>
      </section>
    </>
  );
};
