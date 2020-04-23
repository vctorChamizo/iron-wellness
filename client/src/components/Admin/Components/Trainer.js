import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useSetSnackbar } from "../../../../lib/redux/action";
import {
  getUsersByType,
  addUser,
  removeUser,
} from "../../../../lib/api/user.api";

import { Wrapper } from "../Wrapper";
import { Loading } from "../../PopUp/Loading/index";

export const Trainer = connect((state) => ({ snackbar: state.snackbar }))(
  ({ dispatch }) => {
    const [loading, setLoading] = useState(true);
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
      getUsersByType("TRAINER")
        .then(({ data }) => setTrainers(data))
        .catch((e) => console.error(e.response?.statusText))
        .finally(setLoading(false));
    }, []);

    const handleSanckBar = (message, severity) =>
      dispatch(useSetSnackbar({ message, severity, open: true }));

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

    const handleRemove = async (data) => {
      setLoading(true);
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
      setLoading(false);
    };

    return (
      <>
        <Loading open={loading} />
        <Wrapper
          list={trainers}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          type={"trainer"}
        ></Wrapper>
      </>
    );
  }
);
