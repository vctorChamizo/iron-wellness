import React, { useState, useEffect } from "react";

import {
  getClasses,
  addClass,
  removeClass,
} from "../../../../lib/api/class.api";

import { Wrapper } from "../Wrapper";
import { Loading } from "../../Loading";
import { SnackBar } from "../../Snackbar/index";

export const Class = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);

  const [message, setMessage] = useState();
  const [openMessage, setOpenMessage] = useState(false);
  const [severity, setSeverity] = useState();

  useEffect(() => {
    getClasses()
      .then(({ data }) => setClasses(data))
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  const handleSanckBar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpenMessage(true);
  };

  const handleAdd = async (data, e) => {
    setLoading(true);
    try {
      await addClass(data);

      const newClass = [...classes];
      newClass.push(data);
      setClasses(newClass);

      e.target.reset();
      handleSanckBar("La clase ha sido creada correctamente", "success");
    } catch (error) {
      if (error.response) {
      }
    }
    setLoading(false);
  };

  const handleRemove = async (data) => {
    setLoading(true);
    try {
      await removeClass(data);

      //const newUsers = [...users];
      //newUsers.push(data);
      //setUsers(newUsers);

      handleSanckBar("La clase ha sido eliminada correctamente", "success");
    } catch (error) {
      if (error.response) {
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Loading open={loading} />
      <Wrapper
        list={classes}
        setList={setClasses}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        type={"class"}
      ></Wrapper>
      <SnackBar
        message={message}
        severity={severity}
        openMessage={openMessage}
        setOpenMessage={setOpenMessage}
      />
    </>
  );
};
