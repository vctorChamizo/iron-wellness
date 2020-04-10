import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "fixed",
    top: "20vh",
    left: "20vw",
    right: "2.5vw",
    bottom: "2.5vh",
  },
}));

export const Calendar = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        height="parent"
        timeZone="UTC"
        locales={[esLocale]}
      />
    </div>
  );
};
