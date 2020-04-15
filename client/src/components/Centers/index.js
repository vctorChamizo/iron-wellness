import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1586957613/iron-wellness/components/centers/centers-main_j3wnzs.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  wrapperMain: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    padding: "30vh 0 40vh 10vw",
  },
});

export const Centers = () => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.background}>
        <div className={classes.wrapperMain}>
          <Typography variant="h2" component="h2">
            CENTROS
          </Typography>
          <Typography variant="subtitle1">
            Disfruta en Iron Wellness de los mejores Clubs deportivos y de ocio.
          </Typography>
          <Typography variant="subtitle1">
            Elige tu centro y empieza a disfrutar.
          </Typography>
        </div>
      </section>
      <section className={classes.background}>
        <div className={classes.wrapperMain}>
          <Typography variant="h2" component="h2">
            CENTROS
          </Typography>
          <Typography variant="subtitle1">
            Disfruta en Iron Wellness de los mejores Clubs deportivos y de ocio.
          </Typography>
          <Typography variant="subtitle1">
            Elige tu centro y empieza a disfrutar.
          </Typography>
        </div>
      </section>
      <section className={classes.background}>
        <div className={classes.wrapperMain}>
          <Typography variant="h2" component="h2">
            CENTROS
          </Typography>
          <Typography variant="subtitle1">
            Disfruta en Iron Wellness de los mejores Clubs deportivos y de ocio.
          </Typography>
          <Typography variant="subtitle1">
            Elige tu centro y empieza a disfrutar.
          </Typography>
        </div>
      </section>
      <section></section>
    </>
  );
};
