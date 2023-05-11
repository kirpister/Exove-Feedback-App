import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingPage: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        // background: "black",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "blue",
        opacity: 0.5,
      }}
    >
      <Spinner animation="border" role="status" className="center" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingPage;
