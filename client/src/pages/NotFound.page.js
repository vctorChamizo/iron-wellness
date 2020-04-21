import React from "react";
import { withRouter } from "react-router-dom";

export const NotFoundPage = withRouter(({ history }) => {
  return (
    <div className="background-notfound">
      <p className="title-notfound">404</p>
      <p className="text-notfound">Oops! Algo ha ido mal.</p>
      <div className="wrapper-button">
        <div className="button-notfound" onClick={() => history.push("/")}>
          Regresa a la pagina de INICIO
        </div>
      </div>
    </div>
  );
});
