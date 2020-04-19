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

export const User = ({ dispatch }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [object, setObject] = useState({});

  useEffect(() => {
    getUsersByType("CLIENT")
      .then(({ data }) => setUsers(data))
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  return (
    <>
      <Loading open={loading} />
      <Wrapper
        object={object}
        setObject={setObject}
        list={users}
        type={"user"}
      ></Wrapper>
    </>
  );
};
