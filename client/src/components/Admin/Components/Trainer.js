import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useSetLoading, useSetSnackbar } from "../../../../lib/redux/action";
import {
  getUsersByType,
  addUser,
  removeUser,
} from "../../../../lib/api/user.api";

import { Wrapper } from "../Wrapper";

export const Trainer = connect((state) => ({ snackbar: state.snackbar }))(
  ({ dispatch }) => {
    dispatch(useSetLoading(true));

    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
      getUsersByType("TRAINER")
        .then(({ data }) => setTrainers(data))
        .catch((e) => console.error(e.response?.statusText))
        .finally(dispatch(useSetLoading(false)));
    }, []);

    const handleSanckBar = (message, severity) =>
      dispatch(useSetSnackbar({ message, severity, open: true }));

    const handleAdd = async (data, e) => {
      dispatch(useSetLoading(true));
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
      dispatch(useSetLoading(false));
    };

    const handleRemove = async (data) => {
      dispatch(useSetLoading(true));
      try {
        await removeUser(data);

        const newTrainers = [...trainers];
        const index = trainers.findIndex((e) => e._id === data);
        newTrainers.splice(index, 1);
        setTrainers(newTrainers);

        handleSanckBar(
          "El entrenador ha sido eliminado correctamente",
          "success"
        );
      } catch (error) {
        if (error.response)
          handleSanckBar("Ha ocurrido un error. Vuelve a intentarlo.", "error");
      }
      dispatch(useSetLoading(false));
    };

    return (
      <Wrapper
        list={trainers}
        setList={setTrainers}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        type={"trainer"}
      ></Wrapper>
    );
  }
);
