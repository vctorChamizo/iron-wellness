import React, { useState, useEffect } from "react";

import { getCenters } from "../../../lib/api/center.api";

import { Loading } from "../Loading";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { CardCenter } from "./Card";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1586957613/iron-wellness/components/centers/centers-main_j3wnzs.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  wrapperTitle: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    padding: "30vh 0 40vh 10vw",
  },
  wrapperCenters: {
    backgroundColor: theme.palette.contrast.main,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "2.5vh 2.5vw",
  },
  wrapper: {
    margin: "5vh 2.5vw",
  },
}));

export const Centers = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    getCenters()
      .then(({ data }) => setCenters(data))
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  return (
    <>
      <Loading open={loading} />
      <section className={classes.background}>
        <div className={classes.wrapperTitle}>
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

      <section className={classes.wrapperCenters}>
        {centers.map((e) => (
          <div key={e._id} data-aos="zoom-in" className={classes.wrapper}>
            <CardCenter center={e} />
          </div>
        ))}
      </section>
    </>
  );
};
