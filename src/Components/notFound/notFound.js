import React from "react";
import Error404 from "../../Assets/img/error404.svg";
import "./notFound.css";

export const NotFound = () =>  {
  return (
    <React.Fragment>
      <section className="container-notFound">
        <section className="section-img size-section">
          <img src={Error404} alt="" className="error-404-img" />
        </section>
        <section className="section-text size-section">
          <div className="container-text">
            <h1 className="title txt-global">¡ERROR 404!</h1>
            <h2 className="subtitle txt-global">Página no encontrada</h2>
            <p className="paragraph txt-global">
              Esta página no existe o ha sido
              <br />
              removida. Le sugerimos que vuelva
              <br />
              al inicio.
            </p>
            <button className="btn-regresar" onClick={() => location.href='/'}>Regresar</button>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
}

