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

export const Trainer = ({ dispatch }) => {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);
  const [object, setObject] = useState({});

  useEffect(() => {
    getUsersByType("TRAINER")
      .then(({ data }) => setTrainers(data))
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  return (
    <>
      <Loading open={loading} />
      <Wrapper
        object={object}
        setObject={setObject}
        list={trainers}
        type={"trainer"}
      ></Wrapper>
    </>
  );
};
