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

export const Calendar = ({ events, history }) => {
  const classes = useStyles();

  const handeClick = ({ event }) => history.push(event.id);

  const handleMouseEnter = () =>
    (document.getElementById("calendar").style.cursor = "pointer");

  const handleMouseLeave = () =>
    (document.getElementById("calendar").style.cursor = "default");

  const headerView = {
    left: "title",
    right: "today, prevYear,prev,next,nextYear",
  };

  const formatedEvents = events.map((e) => {
    const date = new Date(e.date);
    const formatDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getDate()}`;

    return {
      title: e.name,
      id: e._id,
      start: formatDate,
      color: "#ff500b",
    };
  });

  return (
    <div className={classes.wrapper} id="calendar">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin]}
        header={headerView}
        height="parent"
        timeZone="UTC"
        locales={[esLocale]}
        eventClick={handeClick}
        eventMouseEnter={handleMouseEnter}
        eventMouseLeave={handleMouseLeave}
        events={formatedEvents}
      />
    </div>
  );
};
