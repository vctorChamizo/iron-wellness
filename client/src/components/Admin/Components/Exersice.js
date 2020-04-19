import React, { useState, useEffect } from "react";

import {
  getExersices,
  getExersice,
  addExersice,
  updateExersice,
  removeExersice,
} from "../../../../lib/api/exersice.api";

import { Wrapper } from "../Wrapper";
import { Loading } from "../../Loading";

export const Exersice = ({ dispatch }) => {
  const [loading, setLoading] = useState(true);
  const [exersices, setExersices] = useState([]);
  const [object, setObject] = useState({});

  useEffect(() => {
    getExersices()
      .then(({ data }) => setExersices(data))
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  return (
    <>
      <Loading open={loading} />
      <Wrapper
        object={object}
        setObject={setObject}
        list={exersices}
        type={"exersice"}
      ></Wrapper>
    </>
  );
};
