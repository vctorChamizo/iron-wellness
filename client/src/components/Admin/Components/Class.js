import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useSetLoading, useSetSnackbar } from "../../../../lib/redux/action";
import {
  getClasses,
  addClass,
  removeClass,
} from "../../../../lib/api/class.api";

import { Wrapper } from "../Wrapper";

export const Class = connect((state) => ({ snackbar: state.snackbar }))(
  ({ dispatch }) => {
    dispatch(useSetLoading(true));

    const [classes, setClasses] = useState([]);

    useEffect(() => {
      getClasses()
        .then(({ data }) => setClasses(data))
        .catch((e) => console.error(e.response?.statusText))
        .finally(dispatch(useSetLoading(false)));
    }, []);

    dispatch(useSetSnackbar({ message, severity, open: true }));

    const handleAdd = async (data, e) => {
      dispatch(useSetLoading(true));
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
      dispatch(useSetLoading(false));
    };

    const handleRemove = async (data) => {
      dispatch(useSetLoading(true));
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
      dispatch(useSetLoading(false));
    };

    return (
      <Wrapper
        list={classes}
        setList={setClasses}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        type={"class"}
      ></Wrapper>
    );
  }
);
