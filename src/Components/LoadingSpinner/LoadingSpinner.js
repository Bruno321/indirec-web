import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({texto, login}) => {
  return (
    <>
      <div className={login ? "spinner-container height-60" : "spinner-container height-90"}>
        <div className="loading-spinner"></div>
        <span>{texto}</span>
      </div>
    </>
  );
}

export default LoadingSpinner;