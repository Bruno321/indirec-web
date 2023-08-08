import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({texto}) => {
  return (
    <>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
        <span>{texto}</span>
      </div>
    </>
  );
}

export default LoadingSpinner;