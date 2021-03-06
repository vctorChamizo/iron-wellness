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

export const User = connect()(({ dispatch }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersByType("CLIENT")
      .then(({ data }) => setUsers(data))
      .catch((e) =>
        handleSanckBar(
          "Ha ocurrido un error. Vuelve a intentarlo más tarde.",
          "error"
        )
      )
      .finally(setLoading(false));
  }, []);

  const handleSanckBar = (message, severity) =>
    dispatch(useSetSnackbar({ message, severity, open: true }));

  const handleAdd = async (data, e) => {
    setLoading(true);
    try {
      data.type = "CLIENT";
      const newUser = await addUser(data);

      const newUsers = [...users];
      newUsers.push(newUser.data);
      setUsers(newUsers);

      e.target.reset();
      handleSanckBar("El usuario ha sido creado correctamente", "success");
    } catch (error) {
      if (error.response) {
        if (error.response.data.status === "UserExists")
          handleSanckBar("El usuario ya existe", "error");
        else handleSanckBar("Esta operación no está permitida", "error");
      }
    }
    setLoading(false);
  };

  const handleRemove = async (data) => {
    setLoading(true);
    try {
      await removeUser(data);

      const newUsers = [...users];
      const index = users.findIndex((e) => e._id === data);
      newUsers.splice(index, 1);
      setUsers(newUsers);

      handleSanckBar("El usuario ha sido eliminado correctamente", "success");
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
        list={users}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        type={"user"}
      ></Wrapper>
    </>
  );
});
