import React, { useState, useEffect } from "react";

import {
  getClasses,
  getClass,
  addClass,
  updateClass,
  removeClass,
} from "../../../../lib/api/class.api";

import { Wrapper } from "../Wrapper";
import { Loading } from "../../Loading";

export const Class = ({ dispatch }) => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [object, setObject] = useState({});

  useEffect(() => {
    getClasses()
      .then(({ data }) => setClasses(data))
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  return (
    <>
      <Loading open={loading} />
      <Wrapper
        object={object}
        setObject={setObject}
        list={classes}
        type={"class"}
      ></Wrapper>
    </>
  );
};
