import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "fixed",
    top: "17.5vh",
    left: "20vw",
    right: "2.5vw",
    bottom: "2.5vh",
  },
}));

export const Calendar = ({ events }) => {
  const classes = useStyles();

  const handeClick = (info) => {
    console.log(info);
  };

  const headerView = {
    left: "title",
    right: "today, prevYear,prev,next,nextYear",
  };

  const formatedEvents = {}; //events.map((e) => {});

  return (
    <div className={classes.wrapper}>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin]}
        header={headerView}
        height="parent"
        timeZone="UTC"
        locales={[esLocale]}
        eventClick={handeClick}
        events={formatedEvents}
      />
    </div>
  );
};
