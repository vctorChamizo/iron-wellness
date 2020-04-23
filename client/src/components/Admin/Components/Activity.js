import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useSetSnackbar } from "../../../../lib/redux/action";
import {
  getActivities,
  addActivity,
  removeActivity,
} from "../../../../lib/api/activity.api";

import { Wrapper } from "../Wrapper";
import { Loading } from "../../PopUp/Loading/index";

export const Activity = connect((state) => ({ snackbar: state.snackbar }))(
  ({ dispatch }) => {
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
      getActivities()
        .then(({ data }) => setActivities(data))
        .catch((e) => console.error(e.response?.statusText))
        .finally(setLoading(false));
    }, []);

    const handleSanckBar = (message, severity) =>
      dispatch(useSetSnackbar({ message, severity, open: true }));

    const handleAdd = async (data, e) => {
      setLoading(true);
      try {
        await addActivity(data);

        const newActivities = [...activities];
        newActivities.push(data);
        setActivities(newActivities);

        e.target.reset();
        handleSanckBar("La actividad ha sido creada correctamente", "success");
      } catch (error) {
        if (error.response)
          handleSanckBar("Ha ocurrido un error. Vuelve a intentarlo.", "error");
      }
      setLoading(false);
    };

    const handleRemove = async (data) => {
      setLoading(true);
      try {
        await removeActivity(data);

        const newActivities = [...activities];
        const index = activities.findIndex((e) => e._id === data);
        newActivities.splice(index, 1);
        setActivities(newActivities);

        handleSanckBar(
          "La actividad ha sido eliminada correctamente",
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
          list={activities}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          type={"activity"}
        ></Wrapper>
      </>
    );
  }
);
