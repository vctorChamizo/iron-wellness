import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useSetSnackbar } from "../../../../lib/redux/action";
import {
  getClasses,
  addClass,
  removeClass,
} from "../../../../lib/api/class.api";

import { Wrapper } from "../Wrapper";
import { Loading } from "../../PopUp/Loading/index";

export const Class = connect((state) => ({ snackbar: state.snackbar }))(
  ({ dispatch }) => {
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
      getClasses()
        .then(({ data }) => setClasses(data))
        .catch((e) => console.error(e.response?.statusText))
        .finally(setLoading(false));
    }, []);

    const handleSanckBar = (message, severity) =>
      dispatch(useSetSnackbar({ message, severity, open: true }));

    const handleAdd = async (data, e) => {
      setLoading(true);
      try {
        await addClass(data);

        const newClass = [...classes];
        newClass.push(data);
        setClasses(newClass);

        e.target.reset();
        handleSanckBar("La clase ha sido creada correctamente", "success");
      } catch (error) {
        if (error.response)
          handleSanckBar("Ha ocurrido un error. Vuelve a intentarlo.", "error");
      }
      setLoading(false);
    };

    const handleRemove = async (data) => {
      setLoading(true);
      try {
        await removeClass(data);

        const newClasses = [...classes];
        const index = classes.findIndex((e) => e._id === data);
        newClasses.splice(index, 1);
        setClasses(newClasses);

        handleSanckBar("La clase ha sido eliminada correctamente", "success");
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
          list={classes}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          type={"class"}
        ></Wrapper>
      </>
    );
  }
);
