import React, { useState, useEffect } from "react";

import {
  getUsersByType,
  getUser,
  addUser,
  updateUser,
  removeUser,
} from "../../../../lib/api/user.api";

import { Wrapper } from "../Wrapper";
import { Loading } from "../../Loading";
import { SnackBar } from "../../Snackbar/index";

export const Trainer = () => {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);
  const [object, setObject] = useState({});

  const [message, setMessage] = useState();
  const [openMessage, setOpenMessage] = useState(false);
  const [severity, setSeverity] = useState();

  useEffect(() => {
    getUsersByType("TRAINER")
      .then(({ data }) => setTrainers(data))
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
      data.type = "TRAINER";
      await addUser(data);

      const newTrainers = [...trainers];
      newTrainers.push(data);
      setTrainers(newTrainers);

      e.target.reset();
      handleSanckBar("El entrenador ha sido creado correctamente", "success");
    } catch (error) {
      if (error.response) {
        if (error.response.data.status === "UserExists")
          handleSanckBar("El entranador ya existe", "error");
        else handleSanckBar("Esta operación no está permitida", "error");
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
        list={trainers}
        setList={setTrainers}
        handleAdd={handleAdd}
        handleGet={handleGet}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        type={"trainer"}
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
