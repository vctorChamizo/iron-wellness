import React, { useState, useEffect } from "react";

import { Loading } from "../../PopUp/Loading/index";
import { ExersiceDialog } from "./ExersiceDialog";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { CardExersice } from "./Card";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1587198847/iron-wellness/components/exersice/main-exersice_hxqlp5.jpg"})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  },
  wrapperTitle: {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    padding: "30vh 0 42.5vh 10vw",
  },
  wrapperExersiceMain: {
    backgroundColor: theme.palette.contrast.main,
    padding: "5vh 2.5vw 5vh 5vh",
  },
  wrapperExersice: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
  },
  card: {
    margin: "2.5vh 2.5vw",
  },
  wrapperTitleExersice: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "3rem",
  },
  title: {
    margin: 0,
    marginBottom: "1.5vh",
    color: theme.palette.primary.main,
  },
  weekTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "100",
    fontSize: "2rem",
    color: theme.palette.primary.main,
  },
  divider: {
    margin: "5vh 0",
  },
}));

const exersiceData = [
  {
    image: {
      url:
        "https://res.cloudinary.com/vctorchzr/image/upload/v1587197820/iron-wellness/components/exersice/Sunday-Arms_Day_sgkmii.png",
    },
    week: 1,
    day: 1,
  },
  {
    image: {
      url:
        "https://res.cloudinary.com/vctorchzr/image/upload/v1587197820/iron-wellness/components/exersice/Sunday-Arms_Day_sgkmii.png",
    },
    week: 1,
    day: 2,
  },
  {
    image: {
      url:
        "https://res.cloudinary.com/vctorchzr/image/upload/v1587197820/iron-wellness/components/exersice/Sunday-Arms_Day_sgkmii.png",
    },
    week: 1,
    day: 3,
  },
  {
    image: {
      url:
        "https://res.cloudinary.com/vctorchzr/image/upload/v1587197820/iron-wellness/components/exersice/Sunday-Arms_Day_sgkmii.png",
    },
    week: 1,
    day: 4,
  },
  {
    image: {
      url:
        "https://res.cloudinary.com/vctorchzr/image/upload/v1587197820/iron-wellness/components/exersice/Sunday-Arms_Day_sgkmii.png",
    },
    week: 1,
    day: 5,
  },
  {
    image: {
      url:
        "https://res.cloudinary.com/vctorchzr/image/upload/v1587197820/iron-wellness/components/exersice/Sunday-Arms_Day_sgkmii.png",
    },
    week: 1,
    day: 6,
  },
  {
    image: {
      url:
        "https://res.cloudinary.com/vctorchzr/image/upload/v1587197820/iron-wellness/components/exersice/Sunday-Arms_Day_sgkmii.png",
    },
    week: 1,
    day: 7,
  },
];

export const Exersice = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [exersice, setExersice] = useState(exersiceData);

  const [imageURL, setImageURL] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (index) => {
    setImageURL(exersice[index].image.url);
    setOpenDialog(true);
  };

  const handleClose = () => setOpenDialog(false);

  // useEffect(() => {
  //   getCenters()
  //     .then(({ data }) => setCenters(data))
  //     .catch((e) => console.error(e.response?.statusText))
  //     .finally(setLoading(false));
  // }, []);

  return (
    <>
      <Loading open={loading} />
      <section className={classes.background}>
        <div className={classes.wrapperTitle}>
          <Typography variant="h2" component="h2">
            EN FORMA
          </Typography>
          <Typography variant="subtitle1">
            Entrena diariamente desde casa con una tabla de ejercicios completa.
          </Typography>
        </div>
      </section>

      <section className={classes.wrapperExersiceMain}>
        <div className={classes.wrapperTitleExersice}>
          <p className={classes.title}>CADA DÍA UN ENTRENAMIENTO</p>
          <Divider />
        </div>

        <p className={classes.weekTitle}>SEMANA 1</p>
        <div className={classes.wrapperExersice}>
          {exersice.map((e, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              className={classes.card}
              onClick={() => handleClick(i)}
            >
              <CardExersice exersice={e} />
            </div>
          ))}
        </div>
        <Divider className={classes.divider} />
      </section>
      <ExersiceDialog
        image={imageURL}
        open={openDialog}
        handleClose={handleClose}
      />
    </>
  );
};
