import React, { useState, useEffect } from "react";

import {
  getCenters,
  getCenter,
  addCenter,
  updateCenter,
  removeCenter,
} from "../../../../lib/api/center.api";

import { Wrapper } from "../Wrapper";
import { Loading } from "../../Loading";
import { SnackBar } from "../../Snackbar/index";

export const Center = ({ dispatch }) => {
  const [loading, setLoading] = useState(true);
  const [centers, setCenters] = useState([]);
  const [object, setObject] = useState({});

  const [message, setMessage] = useState();
  const [openMessage, setOpenMessage] = useState(false);
  const [severity, setSeverity] = useState();

  useEffect(() => {
    getCenters()
      .then(({ data }) => setCenters(data))
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
      console.log("llega aqui");
      await addCenter(data);

      // const newCenters = [...centers];
      // newCenters.push(data);
      // setTrainers(newCenters);

      // e.target.reset();
      handleSanckBar("El centro ha sido creado correctamente", "success");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
    setLoading(false);
  };

  const handleGet = async (data) => {};

  const handleEdit = async (data) => {};

  const handleRemove = async (data) => {};

  return (
    <>
      <Loading open={loading} />
      <Wrapper
        object={object}
        setObject={setObject}
        list={centers}
        setList={setCenters}
        handleAdd={handleAdd}
        handleGet={handleGet}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        type={"center"}
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
