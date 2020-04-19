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

export const Center = ({ dispatch }) => {
  const [loading, setLoading] = useState(true);
  const [centers, setCenters] = useState([]);
  const [object, setObject] = useState({});

  useEffect(() => {
    getCenters()
      .then(({ data }) => setCenters(data))
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  return (
    <>
      <Loading open={loading} />
      <Wrapper
        object={object}
        setObject={setObject}
        list={centers}
        type={"center"}
      ></Wrapper>
    </>
  );
};
